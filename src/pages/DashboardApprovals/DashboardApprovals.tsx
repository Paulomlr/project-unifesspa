import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { mockPendingApprovals } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const DashboardApprovals = () => {
    const [approvals, setApprovals] = useState(mockPendingApprovals);

    const handleApprove = (id: number) => {
        if (window.confirm('Aprovar este projeto?')) {
            setApprovals(approvals.filter(a => a.id !== id));
            alert('Projeto aprovado com sucesso!');
        }
    };

    const handleReject = (id: number) => {
        if (window.confirm('Rejeitar este projeto?')) {
            setApprovals(approvals.filter(a => a.id !== id));
        }
    };

    return (
        <div className="flex min-h-screen bg-secondary-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-secondary-800 mb-2">
                        Aprovações Pendentes
                    </h1>
                    <p className="text-lg text-secondary-600">
                        Gerencie as solicitações de novos projetos
                    </p>
                </div>

                {/* Approvals Grid */}
                <div className="grid gap-6 auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {approvals.length > 0 ? (
                        approvals.map((approval) => (
                            <Card key={approval.id} className="flex flex-col h-full p-6 rounded-xl bg-white">
                                {/* Card Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="bg-primary-100 text-primary-500 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                        {approval.category}
                                    </span>
                                    <span className="text-secondary-600 text-sm">
                                        {new Date(approval.submissionDate).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Project Title */}
                                <h3 className="text-xl font-bold text-secondary-800 mb-6 leading-snug">
                                    {approval.projectTitle}
                                </h3>

                                {/* Submitter Info */}
                                <div className="flex items-center gap-3 mb-6 pt-4 border-t border-secondary-200">
                                    <div className="w-10 h-10 bg-secondary-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {approval.submittedBy.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-secondary-800 text-sm">
                                            {approval.submittedBy}
                                        </p>
                                        <p className="text-xs text-secondary-600">Solicitante</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto flex gap-3">
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
                                        className="border-error text-error hover:bg-error hover:text-white"
                                        onClick={() => handleReject(approval.id)}
                                    >
                                        Rejeitar
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center p-16 bg-white rounded-xl flex flex-col items-center gap-4">
                            <CheckSquare className="w-16 h-16 opacity-20" />
                            <h3 className="text-2xl font-bold text-secondary-800">
                                Nenhuma aprovação pendente
                            </h3>
                            <p className="text-secondary-600">
                                Todos os projetos solicitados foram processados.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardApprovals;
