import React from "react";
import {useSelector} from "react-redux";

const ProjectLoader = () => {
    const selectedExample = useSelector(state => state.exampleCollection.selectedId);
    const selectedXml = useSelector(
        state => {
            if (selectedExample) {
                const examples = state.exampleCollection.data.filter( d => d._id === selectedExample)
                if (examples.length === 1){
                    return examples[0].xml;
                }
            }
            return null
        }
    )
    React.useEffect(
        () => {
            if (selectedExample && selectedXml) {
                window.notebookIde.interpretReqAnchors(selectedXml);
            }
        }, [selectedExample]
    )

    return (
        <div style={{display: "none"}}>
        </div>
    )

}

export default ProjectLoader;
