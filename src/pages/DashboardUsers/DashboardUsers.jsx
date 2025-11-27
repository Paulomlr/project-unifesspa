import { useState } from 'react';
import { mockUsers } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styles from './DashboardUsers.module.css';

const DashboardUsers = () => {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Gerenciar Usuários</h1>
                        <p className={styles.subtitle}>Administre os usuários da plataforma</p>
                    </div>
                    <Button variant="primary">
                        + Novo Usuário
                    </Button>
                </div>

                <Card className={styles.contentCard}>
                    <div className={styles.toolbar}>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className={styles.roleFilter}
                        >
                            <option value="all">Todos os tipos</option>
                            <option value="professor">Professores</option>
                            <option value="aluno">Alunos</option>
                            <option value="admin">Administradores</option>
                        </select>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Usuário</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                    <th>Departamento/Curso</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className={styles.userInfo}>
                                                <img src={user.photo} alt="" className={styles.userThumb} />
                                                <span className={styles.userName}>{user.name}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[user.role]}`}>
                                                {user.role === 'professor' ? 'Professor' :
                                                    user.role === 'aluno' ? 'Aluno' : 'Admin'}
                                            </span>
                                        </td>
                                        <td>{user.department || user.course || '-'}</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionButton}
                                                    title="Editar"
                                                >
                                                    <img src="/src/assets/icons/edit.svg" alt="Editar" />
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.delete}`}
                                                    onClick={() => handleDelete(user.id)}
                                                    title="Excluir"
                                                >
                                                    <img src="/src/assets/icons/trash.svg" alt="Excluir" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default DashboardUsers;
