import React, { useState } from "react";
import './AlunoSelectorModal.css';

const alunosMockData = [
  { id: 1, nome: "João Silva", course: "DEV" },
  { id: 2, nome: "Maria Oliveira", course: "DEV" },
  { id: 3, nome: "Carlos Pereira", course: "DEV" },
  { id: 4, nome: "Julio Pereira", course: "DEV" },
  { id: 5, nome: "Julio Pereira", course: "DEV" },
  { id: 6, nome: "Julio Pereira", course: "DEV" },
  { id: 7, nome: "Julio Pereira", course: "DEV" },
  // Adicione mais alunos conforme necessário
];

function AlunoSelectorModal({ alunosIniciais = [], saveAlunos, closeModal }) {
  const [selectedAlunos, setSelectedAlunos] = useState(alunosIniciais);

  const handleAlunoClick = (aluno, funcao) => {
    const alunoComFuncao = { ...aluno, funcao };
    setSelectedAlunos((prevSelected) =>
      prevSelected.some((a) => a.id === aluno.id)
        ? prevSelected.map((a) => (a.id === aluno.id ? alunoComFuncao : a))
        : [...prevSelected, alunoComFuncao]
    );
  };

  const handleFuncaoChange = (e, aluno) => {
    const funcao = e.target.value;
    handleAlunoClick(aluno, funcao);
  };
  
  const handleSave = () => {
    saveAlunos(selectedAlunos);
    closeModal();
  };

  const isAlunoSelected = (alunoId) => {
    return selectedAlunos.some(aluno => aluno.id === alunoId);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contentt aluno-selector-modal">
        <h2>Selecione os Alunos</h2>
        <main>
          <ul className="aluno-list">
            {alunosMockData.map((aluno) => (
              <li
                key={aluno.id}
                className={`aluno-item ${isAlunoSelected(aluno.id) ? "selected" : ""}`}
              >
                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>Curso:</strong> {aluno.course}</p>
                <select onChange={(e) => handleFuncaoChange(e, aluno)}>
                  <option value="">Selecione uma função</option>
                  <option value="Organizador">Organizador</option>
                  <option value="Voluntário">Voluntário</option>
                  <option value="Apresentador">Apresentador</option>
                </select>
              </li>
            ))}
          </ul>
        </main>
        <div className="modal-actions">
          <button className="save-button" onClick={handleSave}>Salvar</button>
          <button className="cancel-button" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AlunoSelectorModal;
