import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { mockCourses } from '../../services/mockData';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const DashboardCourses = () => {
    const [courses, setCourses] = useState(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este curso?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-secondary-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-secondary-800 mb-2">
                            Gerenciar Cursos
                        </h1>
                        <p className="text-lg text-secondary-600">
                            Visualize e gerencie os cursos da instituição
                        </p>
                    </div>
                    <Button variant="primary">+ Novo Curso</Button>
                </div>

                {/* Courses Table */}
                <Card className="bg-white overflow-hidden rounded-xl">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-secondary-200">
                        <input
                            type="text"
                            placeholder="Buscar por nome ou código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md px-4 py-3 border border-secondary-300 rounded-md text-sm text-secondary-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100 transition"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-secondary-50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Código
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Nome do Curso
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Departamento
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Participantes
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="border-b border-secondary-200">
                                        <td className="px-6 py-4">
                                            <span className="font-mono bg-secondary-50 px-2 py-1 rounded text-sm font-semibold text-secondary-600">
                                                {course.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-secondary-800">
                                            {course.name}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-800">{course.department}</td>
                                        <td className="px-6 py-4 text-secondary-800">{course.participants}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="w-8 h-8 rounded-md border border-secondary-300 bg-white flex items-center justify-center text-secondary-600 hover:border-primary-500 hover:bg-primary-50 transition"
                                                    title="Editar"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    className="w-8 h-8 rounded-md border border-secondary-300 bg-white flex items-center justify-center text-error hover:border-error hover:bg-error/10 transition"
                                                    onClick={() => handleDelete(course.id)}
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={16} />
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

export default DashboardCourses;