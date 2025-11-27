import { useState } from 'react';
import { mockPendingApprovals } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styles from './DashboardApprovals.module.css';

const DashboardApprovals = () => {
    const [approvals, setApprovals] = useState(mockPendingApprovals);

    const handleApprove = (id) => {
        if (window.confirm('Aprovar este projeto?')) {
            setApprovals(approvals.filter(a => a.id !== id));
            alert('Projeto aprovado com sucesso!');
        }
    };

    const handleReject = (id) => {
        if (window.confirm('Rejeitar este projeto?')) {
            setApprovals(approvals.filter(a => a.id !== id));
        }
    };

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Aprovações Pendentes</h1>
                        <p className={styles.subtitle}>Gerencie as solicitações de novos projetos</p>
                    </div>
                </div>

                <div className={styles.approvalsGrid}>
                    {approvals.length > 0 ? (
                        approvals.map((approval) => (
                            <Card key={approval.id} className={styles.approvalCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.category}>{approval.category}</span>
                                    <span className={styles.date}>{new Date(approval.submissionDate).toLocaleDateString()}</span>
                                </div>

                                <h3 className={styles.projectTitle}>{approval.projectTitle}</h3>

                                <div className={styles.submitterInfo}>
                                    <div className={styles.avatarPlaceholder}>
                                        {approval.submittedBy.charAt(0)}
                                    </div>
                                    <div>
                                        <p className={styles.submitterName}>{approval.submittedBy}</p>
                                        <p className={styles.submitterLabel}>Solicitante</p>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        onClick={() => handleApprove(approval.id)}
                                    >
                                        Aprovar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        className={styles.rejectButton}
                                        onClick={() => handleReject(approval.id)}
                                    >
                                        Rejeitar
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <img src="/src/assets/icons/aprovacoes.svg" alt="" className={styles.emptyIcon} />
                            <h3>Nenhuma aprovação pendente</h3>
                            <p>Todos os projetos solicitados foram processados.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardApprovals;
