import React, { useMemo, useState } from 'react';
import { AccessibilitySettingsPanel } from '../components';
import {
  accessibilityAuditReports,
  adminActionTimeline,
  adminMetrics,
  AdminMetrics,
} from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<keyof AdminMetrics>('accessibility');

  const openReports = useMemo(
    () => accessibilityAuditReports.filter(report => report.status !== 'resolved').length,
    []
  );

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportReportsAsJson = () => {
    downloadFile(
      JSON.stringify(accessibilityAuditReports, null, 2),
      'accessibility-reports.json',
      'application/json'
    );
  };

  const exportReportsAsCsv = () => {
    const header = ['id', 'executedAt', 'scope', 'severity', 'status', 'findings', 'tool'];
    const rows = accessibilityAuditReports.map(report => [
      report.id,
      report.executedAt,
      report.scope,
      report.severity,
      report.status,
      String(report.findings),
      report.tool,
    ]);

    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    downloadFile(csv, 'accessibility-reports.csv', 'text/csv;charset=utf-8');
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
                <h3 className="text-info mb-2">{accessibilityAuditReports.length}</h3>
                <p className="text-muted mb-0">Reportes de Accesibilidad</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-warning mb-2">{openReports}</h3>
                <p className="text-muted mb-0">Hallazgos Abiertos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm h-100">
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
                <h5 className="card-title">{adminMetrics[selectedMetric].title}</h5>
                <div className="row">
                  {adminMetrics[selectedMetric].data.map((metric, index) => (
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
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">Acciones Rápidas</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" aria-label="Abrir gestión de usuarios">
                    <span className="fs-5 me-2">👥</span>
                    Gestionar Usuarios
                  </button>
                  <button
                    className="btn btn-success"
                    aria-label="Exportar reportes de accesibilidad en CSV"
                    onClick={exportReportsAsCsv}
                  >
                    <span className="fs-5 me-2">📄</span>
                    Exportar CSV
                  </button>
                  <button
                    className="btn btn-info"
                    aria-label="Exportar reportes de accesibilidad en JSON"
                    onClick={exportReportsAsJson}
                  >
                    <span className="fs-5 me-2">🧾</span>
                    Exportar JSON
                  </button>
                  <button className="btn btn-warning" aria-label="Ejecutar auditoría de accesibilidad">
                    <span className="fs-5 me-2">🔍</span>
                    Auditoría de Accesibilidad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Accessibility Monitoring Panel</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-success btn-sm" onClick={exportReportsAsCsv}>
                    CSV
                  </button>
                  <button className="btn btn-outline-info btn-sm" onClick={exportReportsAsJson}>
                    JSON
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Alcance</th>
                        <th>Severidad</th>
                        <th>Estado</th>
                        <th>Hallazgos</th>
                        <th>Herramienta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accessibilityAuditReports.map(report => (
                        <tr key={report.id}>
                          <td>{report.executedAt}</td>
                          <td>{report.scope}</td>
                          <td>
                            <span
                              className={`badge ${
                                report.severity === 'critical'
                                  ? 'bg-danger'
                                  : report.severity === 'serious'
                                    ? 'bg-warning text-dark'
                                    : report.severity === 'moderate'
                                      ? 'bg-info text-dark'
                                      : 'bg-secondary'
                              }`}
                            >
                              {report.severity}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                report.status === 'resolved'
                                  ? 'bg-success'
                                  : report.status === 'in_progress'
                                    ? 'bg-primary'
                                    : 'bg-danger'
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td>{report.findings}</td>
                          <td>{report.tool}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">Trazabilidad de acciones administrativas</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {adminActionTimeline.map(action => (
                    <li key={action.id} className="list-group-item px-0">
                      <p className="mb-1 fw-semibold">{action.actor} - {action.action}</p>
                      <p className="mb-1 text-muted small">{action.target}</p>
                      <small className="text-secondary">{action.happenedAt}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AccessibilitySettingsPanel />
    </div>
  );
};
