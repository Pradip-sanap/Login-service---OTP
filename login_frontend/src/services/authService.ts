export const getQRCode = async (userId: string): Promise<string> => {
  return `https://api.example.com/qr/${userId}`;
};

export const getOTP = async (email: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("836219"), 500);
  });
};

export const submitOTP = async (
  userId: string,
  otp: string
): Promise<boolean> => {
  return otp === "123456";
};
