const { cpf } = require('cpf-cnpj-validator');

module.exports = (CPF) => {
    const cleanCpf = CPF.replace(/\D/g, '');

    const isValid =  cpf.isValid(cleanCpf);

    if (isValid) {
        return cpf.format(cleanCpf);
    }else{
        return false;
    }
};