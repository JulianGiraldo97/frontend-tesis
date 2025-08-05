import React, { useState } from 'react';
import { AccessibilitySettingsPanel } from '../components/AccessibilitySettingsPanel';

interface MetricData {
  label: string;
  value: string;
  color: string;
}

interface MetricSection {
  title: string;
  data: MetricData[];
}

interface Metrics {
  accessibility: MetricSection;
  users: MetricSection;
}

export const AdminDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<keyof Metrics>('accessibility');

  const metrics: Metrics = {
    accessibility: {
      title: 'Métricas de Accesibilidad',
      data: [
        { label: 'WCAG 2.1 AA Compliance', value: '98%', color: 'success' },
        { label: 'Usuarios con Discapacidad', value: '1,247', color: 'info' },
        { label: 'Tests de Accesibilidad', value: '156/160', color: 'warning' },
        { label: 'Tiempo de Respuesta', value: '2.3s', color: 'primary' }
      ]
    },
    users: {
      title: 'Gestión de Usuarios',
      data: [
        { label: 'Usuarios Activos', value: '2,891', color: 'success' },
        { label: 'Nuevos Registros', value: '156', color: 'info' },
        { label: 'Solicitudes Pendientes', value: '23', color: 'warning' },
        { label: 'Reportes de Accesibilidad', value: '45', color: 'primary' }
      ]
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <h1 className="h2 mb-4">Panel de Administración</h1>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-primary mb-2">2,891</h3>
                <p className="text-muted mb-0">Usuarios Activos</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-success mb-2">98%</h3>
                <p className="text-muted mb-0">Compliance WCAG</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-info mb-2">156</h3>
                <p className="text-muted mb-0">Nuevos Registros</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-warning mb-2">23</h3>
                <p className="text-muted mb-0">Solicitudes Pendientes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${selectedMetric === 'accessibility' ? 'active' : ''}`}
                      onClick={() => setSelectedMetric('accessibility')}
                    >
                      Accesibilidad
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${selectedMetric === 'users' ? 'active' : ''}`}
                      onClick={() => setSelectedMetric('users')}
                    >
                      Usuarios
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">{metrics[selectedMetric].title}</h5>
                <div className="row">
                  {metrics[selectedMetric].data.map((metric, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <span className="text-muted">{metric.label}</span>
                        <span className={`badge bg-${metric.color}`}>{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">Acciones Rápidas</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">
                    <span className="fs-5 me-2">👥</span>
                    Gestionar Usuarios
                  </button>
                  <button className="btn btn-success">
                    <span className="fs-5 me-2">📊</span>
                    Ver Reportes
                  </button>
                  <button className="btn btn-info">
                    <span className="fs-5 me-2">⚙️</span>
                    Configuración
                  </button>
                  <button className="btn btn-warning">
                    <span className="fs-5 me-2">🔍</span>
                    Auditoría de Accesibilidad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccessibilitySettingsPanel />
    </div>
  );
}; 