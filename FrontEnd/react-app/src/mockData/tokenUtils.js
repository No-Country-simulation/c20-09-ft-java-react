// Simple token generator for demonstration purposes
export const generateToken = (user) => {
  const base64Token = btoa(JSON.stringify({ id: user.id, role: user.role }));
  return base64Token;
};
