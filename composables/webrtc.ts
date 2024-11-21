export const useWebRTC = (
  localVideo: Ref<HTMLVideoElement | null>,
  remoteVideo: Ref<HTMLVideoElement | null>
) => {
  const localStream = ref<MediaStream | null>(null);
  const remoteStream = ref<MediaStream | null>(null);
  const peerConnection = ref<RTCPeerConnection | null>(null);
  const { latestMessage, sendMessage } = useMessages();
  const pendingIceCandidates = ref<RTCIceCandidateInit[]>([]);

  const initializeConnection = async () => {
    peerConnection.value = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // ICE Candidate handling
    peerConnection.value.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage.value({
          type: "ice-candidate",
          candidate: event.candidate,
        });
      }
    };

    // Track remote stream
    peerConnection.value.ontrack = (event) => {
      if (event.streams[0]) {
        remoteStream.value = event.streams[0];
      }
    };

    // Attach local tracks
    if (localStream.value) {
      localStream.value.getTracks().forEach((track) => {
        peerConnection.value?.addTrack(track, localStream.value!);
      });
    }

    // Signaling state management
    peerConnection.value.addEventListener("signalingstatechange", () => {
      const state = peerConnection.value?.signalingState;
      console.log(`[WebRTC] Signaling state changed to: ${state}`);

      switch (state) {
        case "stable":
          console.log(
            "[WebRTC] Connection is stable. Ready for further signaling."
          );
          break;
        case "have-local-offer":
          console.log("[WebRTC] Local offer set. Waiting for remote answer.");
          break;
        case "have-remote-offer":
          console.log(
            "[WebRTC] Remote offer received. Ready to create and send an answer."
          );
          break;
        case "closed":
          console.log("[WebRTC] Connection closed.");
          break;
        default:
          console.warn("[WebRTC] Unexpected signaling state:", state);
      }
    });
  };

  const startLocalStream = async () => {
    try {
      localStream.value = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    } catch (error) {
      console.error("Error accessing media devices", error);
    }
  };

  const createOffer = async () => {
    if (!peerConnection.value) return;
    const offer = await peerConnection.value.createOffer();
    await peerConnection.value.setLocalDescription(offer);
    sendMessage.value({ type: "offer", sdp: offer });
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnection.value) await initializeConnection();

    if (peerConnection.value?.signalingState === "stable") {
      await peerConnection.value.setRemoteDescription(offer);
      const answer = await peerConnection.value.createAnswer();
      await peerConnection.value.setLocalDescription(answer);
      sendMessage.value({ type: "answer", sdp: answer });
    } else if (peerConnection.value?.signalingState === "have-local-offer") {
      console.log(
        "[WebRTC] Rolling back local offer to handle the new remote offer."
      );
      await peerConnection.value.setLocalDescription({ type: "rollback" });
      await peerConnection.value.setRemoteDescription(offer);
      const answer = await peerConnection.value.createAnswer();
      await peerConnection.value.setLocalDescription(answer);
      sendMessage.value({ type: "answer", sdp: answer });
    } else {
      console.error("[WebRTC] Unable to process offer. Unexpected state.");
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (peerConnection.value?.signalingState === "have-local-offer") {
      await peerConnection.value.setRemoteDescription(answer);
    } else {
      console.warn("[WebRTC] Cannot handle answer in current signaling state.");
    }
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnection.value) {
      console.warn(
        "[WebRTC] PeerConnection not initialized. Queueing candidate."
      );
      pendingIceCandidates.value.push(candidate);
      return;
    }

    if (peerConnection.value.remoteDescription) {
      await peerConnection.value.addIceCandidate(candidate);
      console.log("[WebRTC] ICE candidate added.");
    } else {
      console.warn("[WebRTC] Remote description not set. Queueing candidate.");
      pendingIceCandidates.value.push(candidate);
    }
  };

  // Process pending ICE candidates once the remote description is set
  watch(
    () => peerConnection.value?.remoteDescription,
    async (remoteDescription) => {
      if (remoteDescription) {
        console.log("[WebRTC] Processing queued ICE candidates.");
        for (const candidate of pendingIceCandidates.value) {
          await peerConnection.value?.addIceCandidate(candidate);
        }
        pendingIceCandidates.value = []; // Clear the queue
      }
    }
  );

  // Watch for local and remote streams and assign them to the respective video elements
  watch(localStream, (stream) => {
    if (localVideo.value && stream) {
      localVideo.value.srcObject = stream;
    }
  });

  watch(remoteStream, (stream) => {
    if (remoteVideo.value && stream) {
      remoteVideo.value.srcObject = stream;
    }
  });

  // Watch signaling messages for WebRTC
  watch(latestMessage, (message) => {
    if (!message) return;

    switch (message.type) {
      case "offer":
        handleOffer(message.sdp);
        break;
      case "answer":
        handleAnswer(message.sdp);
        break;
      case "ice-candidate":
        handleIceCandidate(message.candidate);
        break;
      default:
        console.warn("[WebRTC] Unknown message type:", message.type);
    }
  });

  tryOnMounted(async () => {
    await startLocalStream();
    await initializeConnection();
  });

  return {
    localStream,
    remoteStream,
    createOffer,
  };
};
