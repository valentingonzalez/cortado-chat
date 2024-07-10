export const saveMessages = (messages: any) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

export const loadMessages = () => {
  const messages = localStorage.getItem('messages');
  return messages ? JSON.parse(messages) : [];
};
