function validateName(name) {
    if (!name || typeof name !== 'string') {
      return { valid: false, message: 'Nome não pode ser vazio.' };
    }
  
    if (name.length < 3) {
      return { valid: false, message: 'Nome deve ter pelo menos 3 caracteres.' };
    }
  
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      return { valid: false, message: 'Nome contém caracteres inválidos.' };
    }
  
    return { valid: true, message: 'Nome válido.' };
  }