
(() => {
    'use strict';

    /*******************************
     * Validação de formulários Bootstrap
     *******************************/
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    /*******************************
     * Simulador: cálculo de impacto e abertura do modal
     *******************************/
    const iaForm = document.getElementById("iaForm");
    iaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validação Bootstrap
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add("was-validated");
            return; // Para aqui se não passou na validação
        }
        this.classList.add("was-validated");

        // Calcula total e percentagem
        let total = 0;
        const formData = new FormData(this);
        for (let value of formData.values()) {
            total += parseInt(value);
        }
        let percent = Math.min(100, Math.round((total / 100) * 100));

        // Elementos do DOM
        const resultContainer = document.getElementById("resultContainer");
        const impactBar = document.getElementById("impactBar");
        const impactMessage = document.getElementById("impactMessage");

        // Atualiza barra de impacto
        impactBar.style.width = percent + "%";
        impactBar.innerText = percent + "%";
        impactBar.setAttribute("aria-valuenow", percent);
        impactBar.classList.remove("bg-success", "bg-warning", "bg-danger");

        // Atualiza mensagem de impacto
        impactMessage.classList.remove("alert-success", "alert-warning", "alert-danger");
        impactMessage.innerHTML = "";

        if (percent < 34) {
            impactBar.classList.add("bg-success");
            impactMessage.innerHTML = "Boa notícia! Sua profissão está entre as menos impactadas pela Inteligência Artificial. Isso significa que as habilidades humanas, criativas ou práticas do seu trabalho ainda são muito difíceis de substituir por máquinas.";
            impactMessage.classList.add("alert-success");
        } else if (percent < 67) {
            impactBar.classList.add("bg-warning");
            impactMessage.innerHTML = "Atenção! Sua profissão pode passar por mudanças moderadas com a chegada da Inteligência Artificial. Algumas tarefas podem ser automatizadas, mas as competências humanas ainda são essenciais.";
            impactMessage.classList.add("alert-warning");
        } else {
            impactBar.classList.add("bg-danger");
            impactMessage.innerHTML = "Alerta! Sua profissão está entre as mais impactadas pela Inteligência Artificial. Grande parte das funções já pode ser substituída por tecnologias inteligentes. É importante acompanhar as tendências e buscar adaptação.";
            impactMessage.classList.add("alert-danger");
        }

        // Mostra resultado
        resultContainer.style.display = "block";

        // Abre o modal Bootstrap
        const modal = new bootstrap.Modal(document.getElementById("modalresultado"));
        modal.show();
    });

    /*******************************
     * Botões de reset do formulário
     *******************************/
    document.querySelectorAll(".resetForm").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const form = document.getElementById("iaForm");
            form.reset();
            form.classList.remove("was-validated"); // limpa validação visual
            document.getElementById("resultContainer").style.display = "none"; // esconde resultado
        });
    });

    /*******************************
     * Tabs: alterna conteúdos com data-target
     *******************************/
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabContents.forEach(div => div.classList.remove("active"));
            const targetId = button.getAttribute("data-target");
            const targetDiv = document.getElementById(targetId);
            targetDiv.classList.add("active");
        });
    });

    /*******************************
     * Botões de esconder conteúdo
     *******************************/
    document.querySelectorAll(".hide-btn").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetDiv = document.getElementById(targetId);
            targetDiv.classList.remove("active");
        });
    });

})();

