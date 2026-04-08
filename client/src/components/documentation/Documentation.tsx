import { useState } from 'react';
import { SlidersHorizontal, CircleUser, Theater, LayoutTemplate, Camera, BookCheck, FileText, Waypoints } from 'lucide-react';
import { PlottingDocModal } from './modals/Plotting';
import { UserPortalDocModal } from './modals/UserPortal'
import { ControlsDocModal } from './modals/KeyboardControls';
import { SandBoxDocs } from './modals/SandboxMode';

const docs = [
  {
    key: 'plotting',
    title: 'Plotting',
    description: 'Learn how to add elements, manage input channels, and navigate the 3D canvas.',
    icon: SlidersHorizontal,
  },
  {
    key: 'userPortal',
    title: 'User Portal',
    description: 'Manage your account, profile settings, and authentication.',
    icon: CircleUser,
  },
  {
    key: 'stages',
    title: 'Stages',
    description: 'Browse available stages, import custom stages, and manage stage dimensions.',
    icon: Theater,
  },
  {
    key: 'stagePlots',
    title: 'Stage Plots',
    description: 'Create, organize, and switch between stage plots within your projects.',
    icon: LayoutTemplate,
  },
  {
    key: 'cameraControls',
    title: 'Camera/Keyboard Controls While Plotting',
    description: 'These documents describe how to best use the camera/directional controls in the plotting scene',
    icon: Camera
  },
  {
    key: 'sandboxMode',
    title: 'Sandbox Mode',
    description: 'These documents describe the limitations of sandbox mode',
    icon: BookCheck
  },
  {
    key: 'exportPdf',
    title: 'Exporting to PDF',
    description: 'How to get the best use out of the export to PDF feature found in the utilities drawer',
    icon: FileText
  },
  {
    key: 'sharingPlots',
    title: 'Sharing Plots',
    description: 'How the share feature found in the utilites drawer works',
    icon: Waypoints
  }
];

/**
 * Documentation Page Orchestrator page containing cards of docs modals
 * 
 */
export const Documentation = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="page-container">
      <div className="content-wrapper-narrow">

        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2">Documentation</h2>
          <p className="text-secondary">
            Everything you need to get the most out of StageThree.
          </p>
        </div>

        {/* Doc cards */}
        <div className="grid grid-cols-2">
          {docs.map(({ key, title, description, icon: Icon }) => (
            <button
              key={key}
              className="card"
              onClick={() => setOpen(key)}
              style={{ cursor: 'pointer', textAlign: 'left' }}
            >
              <div className="card-header flex-between">
                <Icon size={20} color="var(--accent-light)" />
                <span className="badge badge-success">Docs</span>
              </div>
              <h4 className="mb-2">{title}</h4>
              <p className="text-muted">{description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {open === 'plotting' && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(null)} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Plotting</h2>
                <p className="text-muted">The application and plotting page</p>
              </div>
              <button className="close-btn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <PlottingDocModal
              onClose={() => setOpen(null)}
            />
          </div>
        </>
      )}

      {open === 'userPortal' && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(null)} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>User Portal</h2>
                <p className="text-muted">Account management and settings</p>
              </div>
              <button className="close-btn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <UserPortalDocModal
              onClose={() => setOpen(null)}
            />
          </div>
        </>
      )}

      {open === 'stages' && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(null)} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Stages</h2>
                <p className="text-muted">Stage data and management</p>
              </div>
              <button className="close-btn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="text-secondary">Stages documentation coming soon.</p>
            </div>
          </div>
        </>
      )}

      {open === 'stagePlots' && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(null)} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Stage Plots</h2>
                <p className="text-muted">Stage plot data and management</p>
              </div>
              <button className="close-btn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="text-secondary">Stage plots documentation coming soon.</p>
            </div>
          </div>
        </>
      )}

      {open === 'cameraControls' && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(null)} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Camera Controls</h2>
                <p className="text-muted">Account management and settings</p>
              </div>
              <button className="close-btn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <ControlsDocModal
              onClose={() => setOpen(null)}
            />
          </div>
        </>
      )}

      {open === 'sandboxMode' && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(null)} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Camera Controls</h2>
                <p className="text-muted">Sandbox Mode</p>
              </div>
              <button className="close-btn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <SandBoxDocs
              onClose={() => setOpen(null)}
            />
          </div>
        </>
      )}
    </div>
  );
};
