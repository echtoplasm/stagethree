import { useState, useEffect } from "react";
import { useStageContext } from "../../contexts/StageContext";
import { fetchAllElementTypes, type ElementType } from "../../api/element";
import { createNewElementPlacement, type ElementPlacement } from "../../api/elementPlacement";
import { useAuth } from "../../contexts/AuthContext";

export const ElementsDrawer = () => {
  const [elementTypes, setElementTypes] = useState<ElementType[]>([]);
  const { stagePlot, setElementPlacements, elementPlacements } = useStageContext();
  const { isAuthenticated } = useAuth();
  const isSandbox = !isAuthenticated;


  const fetchElementTypes = async () => {
    const data = await fetchAllElementTypes();
    setElementTypes(data);
    console.log(elementTypes);
  }


  const handleElementClick = async (elt: ElementType) => {
    if (!stagePlot && !isSandbox) return null;

    const data: ElementPlacement = {
      elementTypeId: elt.id,
      stagePlotId: stagePlot?.id,
      name: elt.name,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }

    if (isSandbox) {

      setElementPlacements([...elementPlacements, { ...data, id: Date.now() }])

    } else {

      const newPlacement = await createNewElementPlacement(data);
      setElementPlacements([...elementPlacements, newPlacement]);

    }
  }

  useEffect(() => {
    fetchElementTypes();
  }, [])


  return (
    <div className="element-row">
      {elementTypes.map((elt: any) => (
        <div key={elt.id} className='element-item' onClick={() => handleElementClick(elt)}>{elt.name}</div>
      ))}
    </div>
  )
}
