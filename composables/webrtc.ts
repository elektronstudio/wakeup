export const useWebRTC = (
  localVideo: Ref<HTMLVideoElement | null>,
  remoteVideo: Ref<HTMLVideoElement | null>
) => {
  const localStream = ref<MediaStream | null>(null);
  const remoteStream = ref<MediaStream | null>(null);
  const peerConnection = ref<RTCPeerConnection | null>(null);
  const { latestMessage, sendMessage } = useMessages();

  const initializeConnection = async () => {
    peerConnection.value = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.value.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage.value({
          type: "ice-candidate",
          candidate: event.candidate,
        });
      }
    };

    peerConnection.value.ontrack = (event) => {
      if (event.streams[0]) {
        remoteStream.value = event.streams[0];
      }
    };

    if (localStream.value) {
      localStream.value.getTracks().forEach((track) => {
        peerConnection.value?.addTrack(track, localStream.value!);
      });
    }
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
    await peerConnection.value!.setRemoteDescription(offer);
    const answer = await peerConnection.value!.createAnswer();
    await peerConnection.value!.setLocalDescription(answer);
    sendMessage.value({ type: "answer", sdp: answer });
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    await peerConnection.value?.setRemoteDescription(answer);
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    await peerConnection.value?.addIceCandidate(candidate);
  };

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

    if (message.type === "offer") {
      handleOffer(message.sdp);
    }
    if (message.type === "answer") {
      handleAnswer(message.sdp);
    }
    if (message.type === "ice-candidate") {
      handleIceCandidate(message.candidate);
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
