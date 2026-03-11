import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { mockJobs } from '../data/mockData';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const selectedJob = mockJobs.find(job => job.id === id) || mockJobs[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
                <Link to="/jobs" className="hover:text-gray-700" aria-label="Volver al listado de empleos">Empleos</Link>
                <span className="mx-2">/</span>
                <span>{selectedJob.title}</span>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h1>
            </div>
            <Button>
              Postularse
            </Button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" aria-labelledby="job-detail-content-heading">
        <div className="px-4 py-6 sm:px-0">
          <h2 id="job-detail-content-heading" className="sr-only">
            Detalle del empleo
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <section className="bg-white shadow rounded-lg p-6 mb-6" aria-labelledby="job-description-heading">
                <h2 id="job-description-heading" className="text-xl font-semibold text-gray-900 mb-4">Descripción del puesto</h2>
                <p className="text-gray-600 mb-4">
                  {selectedJob.description}
                </p>
              </section>

              <section className="bg-white shadow rounded-lg p-6 mb-6" aria-labelledby="job-requirements-heading">
                <h2 id="job-requirements-heading" className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </section>

              <section className="bg-white shadow rounded-lg p-6" aria-labelledby="job-benefits-heading">
                <h2 id="job-benefits-heading" className="text-xl font-semibold text-gray-900 mb-4">Beneficios</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-labelledby="company-info-heading">
              <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                <h2 id="company-info-heading" className="text-lg font-semibold text-gray-900 mb-4">Información de la empresa</h2>
                
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-gray-900">Empresa</dt>
                    <dd className="text-sm text-gray-600">{selectedJob.company}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Sector</dt>
                    <dd className="text-sm text-gray-600">Empresa inclusiva</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Ubicación</dt>
                    <dd className="text-sm text-gray-600">{selectedJob.location}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Tipo de contrato</dt>
                    <dd className="text-sm text-gray-600">{selectedJob.contractType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Salario</dt>
                    <dd className="text-sm text-gray-600">{selectedJob.salary}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Fecha de publicación</dt>
                    <dd className="text-sm text-gray-600">{selectedJob.postedDate}</dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-3">
                  <Button className="w-full">
                    Postularse ahora
                  </Button>
                  <Button variant="outline" className="w-full">
                    Guardar empleo
                  </Button>
                  <Button variant="outline" className="w-full">
                    Compartir
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}; 
