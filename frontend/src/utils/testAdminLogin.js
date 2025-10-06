export const testAdminLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'attisivasaikarthik@gmail.com',
        password: 'Jaishu@1117'
      })
    });
    
    const data = await response.json();
    console.log('Raw API Response:', data);
    return data;
  } catch (error) {
    console.error('Test API Error:', error);
    return null;
  }
};