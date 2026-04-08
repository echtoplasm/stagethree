import { type StageSceneHandle } from '../ThreeD';
import { useStageContext } from '../../contexts/StageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { Clipboard } from 'lucide-react';

interface UtilitiesDrawerProps {
  sceneRef: React.RefObject<StageSceneHandle | null>;
  setShowColorPicker: (val: boolean) => void;
  setShowCurrentStage: (val: boolean) => void;
  setShowStageObjects: (val: boolean) => void;
  showColorPicker: boolean;
  showCurrentStage: boolean;
  showStageObjects: boolean;
}

/**
 * Drawer component exposing export, sharing, and overlay toggle utilities for the plotting page.
 * Renders a sign-in prompt in place of controls when the user is in sandbox mode.
 *
 * @param sceneRef - Ref to the Three.js scene handle, used to capture a snapshot for PDF export.
 * @param setShowColorPicker - Setter to toggle the color picker overlay.
 * @param setShowCurrentStage - Setter to toggle the stage info overlay.
 * @param setShowStageObjects - Setter to toggle the stage objects overlay.
 * @param showColorPicker - Current visibility state of the color picker overlay.
 * @param showCurrentStage - Current visibility state of the stage info overlay.
 * @param showStageObjects - Current visibility state of the stage objects overlay.
 * @returns The utilities drawer UI, or a sign-in prompt if unauthenticated.
 */
export const UtilitiesDrawer = ({ sceneRef, setShowColorPicker, setShowCurrentStage, setShowStageObjects, showColorPicker, showCurrentStage, showStageObjects }: UtilitiesDrawerProps) => {
  const { inputChannels, stage, stagePlot } = useStageContext();
  const { isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const isSandbox = !isAuthenticated;

  console.log(stagePlot);

  /**
   * Generates and downloads a PDF containing a Three.js scene snapshot,
   * input channel list, stage plot metadata, and stage dimensions.
   * Returns early if a scene snapshot cannot be captured.
   */
  const handlePdfExport = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const snapshot = sceneRef?.current?.getSnapshot();
    if (!snapshot) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Stage Plot', 10, 10);

    const imgHeight = 100;
    doc.addImage(snapshot, 'PNG', 10, 20, 190, imgHeight);

    autoTable(doc, {
      startY: 20 + imgHeight + 10,
      head: [['Channel', 'Instrument', 'Mic / DI', 'Notes']],
      body: inputChannels.map(ic => [
        ic.channelNumber,
        ic.instrumentName ?? '',
        ic.micType ?? '',
        ic.notes ?? '',
      ]),
      margin: { left: 10, right: 10 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    autoTable(doc, {
      head: [['Stage Plot Name', 'Gig Date']],
      body: [[stagePlot?.name ?? '', stagePlot?.gigDate ?? '']],
      margin: { left: 10, right: 10 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    })

    autoTable(doc, {
      head: [['Stage Name', 'Stage Width', 'Stage Height']],
      body: [[
        stage?.name ?? '',
        stage?.width ?? '',
        stage?.height ?? ''
      ]],
      margin: { left: 10, right: 10 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    })


    doc.save('stage-plot.pdf');
  };


  /**
   * Copies the public share link for the active stage plot to the clipboard.
   * Resolves the base URL from the current Vite environment mode.
   * Briefly sets copied state to true to trigger UI feedback.
   */
  const handleShareLink = () => {
    const base = import.meta.env.MODE === 'production'
      ? 'https://stagethree.dev'
      : 'http://localhost:5173';
    navigator.clipboard.writeText(`${base}/share/${stagePlot?.stagePlotUUID}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="utilities-drawer">
      {!isSandbox ? (
        <>
          <div className="utilities-section">
            <span className="utilities-section-label">Export</span>
            <div className="utilities-actions">
              <button className="btn btn-primary btn-sm" onClick={handlePdfExport}>
                Export to PDF
              </button>
              <button className="btn btn-ghost btn-sm" onClick={handleShareLink}>
                <Clipboard size={13} />
                {copied ? 'Copied!' : 'Share Plot'}
              </button>
            </div>
          </div>

          <div className="utilities-divider" />

          <div className="utilities-section">
            <span className="utilities-section-label">Overlays</span>
            <div className="utilities-toggles">
              <label className="toggle-switch">
                <input type="checkbox" checked={showStageObjects} onChange={e => setShowStageObjects(e.target.checked)} />
                <span>Stage Objects</span>
              </label>
              <label className="toggle-switch">
                <input type="checkbox" checked={showColorPicker} onChange={e => setShowColorPicker(e.target.checked)} />
                <span>Color Picker</span>
              </label>
              <label className="toggle-switch">
                <input type="checkbox" checked={showCurrentStage} onChange={e => setShowCurrentStage(e.target.checked)} />
                <span>Stage Info</span>
              </label>
            </div>
          </div>
        </>
      ) : (
        <div className="alert mb-6">
          <Info size={18} />
          <span>Sign in to access utility functions.</span>
        </div>
      )}
    </div>
  );
}
