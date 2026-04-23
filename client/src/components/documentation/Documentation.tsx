import { useState } from 'react';
import { SlidersHorizontal, CircleUser, Theater, LayoutTemplate, Camera, BookCheck, FileText, Waypoints, MessageSquareQuote, MapPin } from 'lucide-react';
import { PlottingDocModal } from './modals/Plotting';
import { UserPortalDocModal } from './modals/UserPortal';
import { ControlsDocModal } from './modals/KeyboardControls';
import { AttributionModal } from './modals/Attribution';
import { SandBoxDocs } from './modals/SandboxMode';
import { SharePlotDocs } from './modals/SharingPlots';
import { PdfExportDocs } from './modals/PdfExport';
import { StagesDocs } from './modals/Stages';
import { VenuesDocs } from './modals/Venues';
import { StagePlotsDocs } from './modals/StagePlots';

const docs = [
  {
    key: 'attribution',
    title: 'Model Attribution',
    description: 'Attributions for the 3D model authors who posted their work online for free.',
    icon: MessageSquareQuote,
  },
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
    key: 'venues',
    title: 'Venues',
    description: 'Create and manage venues that house your stages.',
    icon: MapPin,
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
    title: 'Camera & Keyboard Controls',
    description: 'How to best use the camera and directional controls in the plotting scene.',
    icon: Camera,
  },
  {
    key: 'sandboxMode',
    title: 'Sandbox Mode',
    description: 'The limitations of sandbox mode and how to exit it.',
    icon: BookCheck,
  },
  {
    key: 'exportPdf',
    title: 'Exporting to PDF',
    description: 'How to get the best use out of the export to PDF feature in the utilities drawer.',
    icon: FileText,
  },
  {
    key: 'sharingPlots',
    title: 'Sharing Plots',
    description: 'How the share feature in the utilities drawer works.',
    icon: Waypoints,
  },
];

/**
 * Documentation page — grid of doc cards, each opening its respective modal.
 */
export const Documentation = () => {
  const [open, setOpen] = useState<string | null>(null);
  const close = () => setOpen(null);

  return (
    <div className="page-container">
      <div className="content-wrapper-narrow">
        <div className="mb-8">
          <h1 className="mb-2">Documentation</h1>
          <p className="text-secondary">
            Everything you need to get the most out of StageThree.
          </p>
        </div>

        <div className="grid grid-cols-2 docs-card-container">
          {docs.map(({ key, title, description, icon: Icon }) => (
            <button
              key={key}
              className="card docs-card"
              onClick={() => setOpen(key)}
            >
              <div className="card-header flex-between">
                <Icon size={20} color="var(--accent-light)" />
                <span className="badge badge-success">Docs</span>
              </div>
              <h2 className="mb-2">{title}</h2>
              <p className="text-muted">{description}</p>
            </button>
          ))}
        </div>
      </div>

      {open === 'plotting' && (
        <>
          <div className="modal-backdrop" onClick={close} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Plotting</h2>
                <p className="text-muted">The application and plotting page</p>
              </div>
              <button className="close-btn" onClick={close}>✕</button>
            </div>
            <PlottingDocModal onClose={close} />
          </div>
        </>
      )}

      {open === 'userPortal' && (
        <>
          <div className="modal-backdrop" onClick={close} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>User Portal</h2>
                <p className="text-muted">Account management and settings</p>
              </div>
              <button className="close-btn" onClick={close}>✕</button>
            </div>
            <UserPortalDocModal onClose={close} />
          </div>
        </>
      )}

      {open === 'cameraControls' && (
        <>
          <div className="modal-backdrop" onClick={close} />
          <div className="modal modal-wide modal-scrollable">
            <div className="modal-header">
              <div>
                <h2>Camera & Keyboard Controls</h2>
                <p className="text-muted">Navigating the 3D scene</p>
              </div>
              <button className="close-btn" onClick={close}>✕</button>
            </div>
            <ControlsDocModal onClose={close} />
          </div>
        </>
      )}

      {open === 'attribution' && <AttributionModal onClose={close} />}
      {open === 'sandboxMode' && <SandBoxDocs onClose={close} />}
      {open === 'exportPdf' && <PdfExportDocs onClose={close} />}
      {open === 'sharingPlots' && <SharePlotDocs onClose={close} />}
      {open === 'stages' && <StagesDocs onClose={close} />}
      {open === 'venues' && <VenuesDocs onClose={close} />}
      {open === 'stagePlots' && <StagePlotsDocs onClose={close} />}
    </div>
  );
};
