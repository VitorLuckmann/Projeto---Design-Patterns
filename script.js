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

const renderCustomizationForm = () => {
    document.getElementById('content').innerHTML = `
        <div class="card p-4">
            <h2>Gerar Relatório</h2>
            <form id="customization-form">
                <div class="mb-3">
                    <label for="headerText" class="form-label">Cabeçalho</label>
                    <input type="text" id="headerText" class="form-control" placeholder="Texto do cabeçalho" required>
                </div>
                <div class="mb-3">
                    <label for="bgColor" class="form-label">Cor de Fundo</label>
                    <input type="color" id="bgColor" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="addBorder" class="form-check-label">
                        <input type="checkbox" id="addBorder" class="form-check-input">
                        Adicionar Bordas
                    </label>
                </div>
                <div class="mb-3" id="borderOptions" style="display: none;">
                    <label for="borderStyle" class="form-label">Estilo da Borda</label>
                    <select id="borderStyle" class="form-select">
                        <option value="continuous">Contínua</option>
                        <option value="dashed">Tracejada</option>
                        <option value="dotted">Pontilhada</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Gerar Relatório</button>
            </form>
        </div>
    `;

    const addBorderCheckbox = document.getElementById('addBorder');
    const borderOptions = document.getElementById('borderOptions');

    addBorderCheckbox.addEventListener('change', (e) => {
        borderOptions.style.display = e.target.checked ? 'block' : 'none';
    });

    const customizationForm = document.getElementById('customization-form');
    customizationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const headerText = document.getElementById('headerText').value;
        const bgColor = document.getElementById('bgColor').value;
        const addBorder = document.getElementById('addBorder').checked;
        const borderStyle = addBorder ? document.getElementById('borderStyle').value : null;

        generateReport(headerText, bgColor, addBorder, borderStyle);
    });
};

const generateReport = (headerText, bgColor, addBorder, borderStyle) => {
    const userManager = new UserManager();
    const users = userManager.getUsers();

    if (users.length === 0) {
        alert("Nenhum usuário registrado para gerar o relatório.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    if (bgColor) {
        pdf.setFillColor(bgColor);
        pdf.rect(0, 0, 210, 297, "F");
    }

    if (headerText) {
        pdf.setFontSize(20);
        pdf.setTextColor(0, 102, 204);
        pdf.text(headerText, 105, 10, { align: "center" });
    }

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    let y = 30;
    users.forEach((user, index) => {
        pdf.text(`${index + 1}. Nome: ${user.name}`, 10, y);
        pdf.text(`   Email: ${user.email}`, 10, y + 5);
        pdf.text(`   Telefone: ${user.phone}`, 10, y + 10);
        y += 20;
    });

    if (addBorder) {
        switch (borderStyle) {
            case "dashed":
                pdf.setLineDashPattern([5, 3], 0);
                break;
            case "dotted":
                pdf.setLineDashPattern([1, 3], 0);
                break;
            default:
                pdf.setLineDashPattern([], 0);
        }
        pdf.rect(5, 5, 200, 287);
    }

    pdf.save("relatorio_usuarios.pdf");
    alert("Relatório gerado com sucesso! O download foi iniciado.");
};

const renderRegisterForm = () => {
    document.getElementById('content').innerHTML = `
        <div class="card p-4">
            <h2>Registrar Usuário</h2>
            <form id="user-form">
                <div class="mb-3">
                    <label for="name" class="form-label">Nome</label>
                    <input type="text" id="name" class="form-control" placeholder="Digite o nome" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control" placeholder="Digite o email" required>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Número de Telefone</label>
                    <input type="text" id="phone" class="form-control" placeholder="Digite o número de telefone" required>
                </div>
                <button type="submit" class="btn btn-primary">Registrar</button>
            </form>
        </div>
    `;

    const userForm = document.getElementById('user-form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const userManager = new UserManager();
        userManager.addUser({ name, email, phone });

        alert('Usuário registrado com sucesso!');
        userForm.reset();
    });
};

const renderUserList = () => {
    const userManager = new UserManager();
    const users = userManager.getUsers();

    document.getElementById('content').innerHTML = `
        <div class="card p-4">
            <h2>Usuários Registrados</h2>
            ${
                users.length > 0
                    ? `<ul>${users.map(user => `
                        <li>
                            <strong>Nome:</strong> ${user.name} <br>
                            <strong>Email:</strong> ${user.email} <br>
                            <strong>Telefone:</strong> ${user.phone}
                        </li>
                    `).join('')}</ul>`
                    : '<p class="text-danger">Nenhum usuário encontrado.</p>'
            }
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('link-register').addEventListener('click', (e) => {
        e.preventDefault();
        renderRegisterForm();
    });

    document.getElementById('link-report').addEventListener('click', (e) => {
        e.preventDefault();
        renderCustomizationForm();
    });

    document.getElementById('link-consult').addEventListener('click', (e) => {
        e.preventDefault();
        renderUserList();
    });

    renderRegisterForm();
});