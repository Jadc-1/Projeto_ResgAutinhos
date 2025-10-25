function irParaContatos()
{
    const secaoContatos = document.getElementById('contatos'); 
    if (secaoContatos) //Permite fazer a mesma funcionalidade da tag <a> para lugares especificos
    {
        secaoContatos.scrollIntoView({
            behavior: 'smooth'
        });
    }
}