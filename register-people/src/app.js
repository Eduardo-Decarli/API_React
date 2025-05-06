import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [formValido, setFormValido] = useState(false);
    const [mensagemFinal, setMensagemFinal] = useState('');

    const validarNome = nome.trim().length >= 3;
    const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validarTipo = tipo !== '';

    useEffect(() => {
        if (validarNome && validarEmail && validarTipo) {
            setFormValido(true);
        } else {
            setFormValido(false);
        }
    }, [nome, email, tipo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensagemFinal(`Cadastro realizado: ${tipo} - Nome: ${nome}, Email: ${email}`);
    };

    return (
        <div className="container">
            <h2>Cadastro de Pessoa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label><br />
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome"
                    />
                    {!validarNome && nome.length > 0 && <p style={{ color: 'red' }}>Nome deve ter ao menos 3 caracteres.</p>}
                </div>

                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@dominio.com"
                    />
                    {!validarEmail && email.length > 0 && <p style={{ color: 'red' }}>Email inválido.</p>}
                </div>

                <div>
                    <label>Tipo:</label><br />
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="Funcionário">Funcionário</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Fornecedor">Fornecedor</option>
                    </select>
                    {!validarTipo && <p style={{ color: 'red' }}>Selecione um tipo válido.</p>}
                </div>

                <button type="submit" disabled={!formValido}>
                    Enviar
                </button>
            </form>

            {mensagemFinal && (
                <div className="resultado">
                    <h4>{mensagemFinal}</h4>
                </div>
            )}
        </div>
    );
}

export default App;
