
# Sistema de Registro de Usuários e Relatórios Personalizados

Este projeto implementa um sistema modular para registro de usuários e geração de relatórios personalizados. O objetivo principal é demonstrar a aplicação de dois padrões de design: **Singleton** e **Decorator**, oferecendo um sistema flexível e extensível.

---

## **Características do Sistema**

1. **Registro de Usuários**  
   - Permite registrar usuários com os seguintes dados:
     - Nome
     - Email
     - Número de Telefone  
   - Utiliza o padrão **Singleton** para garantir que apenas uma instância do gerenciador de usuários seja utilizada em toda a aplicação.

2. **Relatórios Personalizados**  
   - Gera relatórios em formato PDF com personalização dinâmica:
     - Cabeçalhos customizáveis.
     - Cor de fundo definida pelo usuário.
     - Bordas opcionais.  
   - Utiliza o padrão **Decorator** para adicionar essas funcionalidades ao relatório de forma dinâmica, sem alterar a lógica principal.

3. **Consulta de Usuários**  
   - Lista todos os usuários registrados.

---

## **Padrões de Projeto Utilizados**

### **1. Singleton**  
- **Problema**: Garantir que o gerenciamento de usuários seja único e centralizado.  
- **Solução**: A classe `UserManager` segue o padrão Singleton, permitindo que apenas uma instância exista em toda a aplicação. Isso assegura consistência ao manipular os dados de usuários.

**Exemplo de Código**:
```javascript
class UserManager {
    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        this.users = [];
        UserManager.instance = this;
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }
}
```

---

### **2. Decorator**  
- **Problema**: Oferecer personalização dinâmica no relatório sem alterar diretamente a lógica principal.  
- **Solução**: A personalização (como cabeçalho, cor de fundo e bordas) é adicionada dinamicamente ao relatório utilizando funções que encapsulam esses comportamentos.

**Exemplo de Código**:
```javascript
const generateReport = (headerText, bgColor, addBorder) => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    if (bgColor) {
        pdf.setFillColor(bgColor);
        pdf.rect(0, 0, 210, 297, "F"); // Fundo
    }

    if (headerText) {
        pdf.setFontSize(20);
        pdf.setTextColor(0, 102, 204); // Azul
        pdf.text(headerText, 105, 10, { align: "center" });
    }

    if (addBorder) {
        pdf.rect(5, 5, 200, 287); // Borda
    }

    pdf.save("relatorio_usuarios.pdf");
};
```

---

## **Como Rodar o Projeto**

### **1. Pré-requisitos**
- Navegador web atualizado.
- Conexão com a internet para carregar bibliotecas externas.

---

### **2. Passos para Rodar**
1. Faça o download ou clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Abra o arquivo `index.html` em um navegador web.

---

### **3. Navegando no Sistema**
- **Registro de Usuários**:
  - Clique na aba "Registrar Usuário".
  - Preencha o formulário e clique em "Registrar".  
  - O sistema armazenará o usuário utilizando o padrão Singleton.

- **Consulta de Usuários**:
  - Clique na aba "Consultar Usuários".
  - Veja a lista de usuários registrados.

- **Geração de Relatórios**:
  - Clique na aba "Gerar Relatório".
  - Preencha as opções de personalização (cabeçalho, cor de fundo, bordas).
  - Clique em "Gerar Relatório" para fazer o download do PDF.

---

## **Tecnologias Utilizadas**

- **HTML** e **CSS**: Estrutura e estilo.
- **JavaScript**: Lógica e interação dinâmica.
- **Bootstrap**: Layout responsivo.
- **jsPDF**: Biblioteca para geração de PDFs.

---

## **Exemplo de Uso**

### **1. Registro de Usuário**
- **Input**:
  - Nome: João Silva
  - Email: joao@example.com
  - Telefone: (11) 91234-5678
- **Resultado**: Usuário registrado com sucesso.

### **2. Geração de Relatório**
- **Configurações**:
  - Cabeçalho: "Relatório de Usuários"
  - Cor de Fundo: Azul (#0000FF)
  - Adicionar Bordas: Sim
- **Resultado**: PDF gerado com os usuários registrados e as opções de formatação aplicadas.

Desenvolvedores: @VitorLuckmann[(https://github.com/VitorLuckmann)]