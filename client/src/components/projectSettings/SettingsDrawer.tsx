import { type StageSceneHandle } from '../ThreeD';
import { useStageContext } from '../../contexts/StageContext';

interface SettingsDrawerProps {
  sceneRef: React.RefObject<StageSceneHandle | null>;
}

export const SettingsDrawer = ({ sceneRef }: SettingsDrawerProps) => {
  const { inputChannels, stage, stagePlot } = useStageContext();

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

  return (
    <div>
      <button className="btn btn-primary" onClick={handlePdfExport}>
        Export Scene to PDF
      </button>
    </div>
  );
};
