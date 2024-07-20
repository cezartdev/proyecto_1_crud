const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|PlayBook|Silk/i.test(
        navigator.userAgent
    );
};

export default isMobileDevice;
