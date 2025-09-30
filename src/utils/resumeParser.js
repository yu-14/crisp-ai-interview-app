export const parseResumeText = (text) => {
  let name = null;
  let email = null;
  let phone = null;

  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    email = emailMatch[0];
  }

  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    phone = phoneMatch[0];
  }

  const lines = text.trim().split('\n');
  if (lines.length > 0) {
    name = lines[0].trim();
    if (name.includes('@')) {
      name = null;
    }
  }

  return { name, email, phone };
};