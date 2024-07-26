/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    civilState: "",
    gender: "",
  });
  const formProgressInPercent = calculateProgress();

  function updateFormData(formEvent) {
    const {
      target: { name, value },
    } = formEvent;

    setFormData((currentState) => {
      return {
        ...currentState,
        [name]: value,
      };
    });
  }

  function calculateProgress() {
    const fieldNames = Object.keys(formData);
    const totalFields = fieldNames.length;
    let qttValid = 0;
    for (const fieldName of fieldNames) {
      const formValue = formData[fieldName];
      if (!!formValue) {
        if (fieldName === "email") {
          const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const isInvalidEmail = !emailRegex.test(formValue);
          if (isInvalidEmail) {
            continue;
          }
        }

        if (fieldName === "name") {
          const isInvalidName = formValue.trim().split(" ").length < 2;
          if (isInvalidName) {
            continue;
          }
        }

        qttValid += 1;
      }
    }

    return (qttValid / totalFields) * 100;
  }

  function handleFormSubmit() {
    alert("Sucesso!");
    setFormData({
      name: "",
      email: "",
      civilState: "",
      gender: "",
    });
  }

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: `${formProgressInPercent}%` }}
          ></div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            id="name"
            name="name"
            onChange={updateFormData}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={updateFormData}
            value={formData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="civilState">Estado Civil</label>
          <select id="civilState" name="civilState" onChange={updateFormData}>
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                name="gender"
                onChange={updateFormData}
                type="radio"
                value={"m"}
                checked={formData.gender === "m"}
              />{" "}
              Masculino
            </span>
            <span>
              <input
                name="gender"
                onChange={updateFormData}
                type="radio"
                value={"f"}
                checked={formData.gender === "f"}
              />{" "}
              Feminino
            </span>
          </div>
        </div>
        <button
          disabled={formProgressInPercent < 100}
          onClick={handleFormSubmit}
        >
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
