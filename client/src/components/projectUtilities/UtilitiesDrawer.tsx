import { type StageSceneHandle } from '../ThreeD';
import { useStageContext } from '../../contexts/StageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { Clipboard } from 'lucide-react';

interface UtilitiesDrawerProps {
  sceneRef: React.RefObject<StageSceneHandle | null>;
}

export const UtilitiesDrawer = ({ sceneRef }: UtilitiesDrawerProps) => {
  const { inputChannels, stage, stagePlot } = useStageContext();
  const { isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const isSandbox = !isAuthenticated;

  console.log(stagePlot);


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

  const handleShareLink = () => {
    const base = import.meta.env.MODE === 'production'
      ? 'https://stagethree.dev'
      : 'http://localhost:5173';
    navigator.clipboard.writeText(`${base}/share/${stagePlot?.stagePlotUUID}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      {!isSandbox ? (
        <div className='row'>
          <button className="btn btn-primary" onClick={handlePdfExport}>
            Export Scene to PDF
          </button>
          <button className="btn btn-primary" onClick={() => handleShareLink()}>
            {copied ? <><Clipboard size={12} /> Copied</> : 'Share Plot'}
          </button>
        </div>
      ) : (
        <div className="alert mb-6">
          <Info size={18} />
          <span>
            You cannot use the utility functions of StageThree while in sandbox mode. You must sign in or sign up to exit sandbox mode.
          </span>
        </div>
      )}
    </div>
  );
}
