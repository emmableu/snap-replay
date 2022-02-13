import React from "react";
import {useSelector} from "react-redux";

const ProjectLoader = () => {
    const selectedExample = useSelector(state => state.exampleCollection.selectedId);
    const selectedXml = useSelector(
        state => {
            if (selectedExample) {
                const xml = state.exampleCollection.data[selectedExample]
                return xml;
            }
            return null
        }
    )
    React.useEffect(
        () => {
            if (selectedExample && selectedXml) {
                window.notebookIde.interpretReqAnchors(selectedXml);
            }
            else {
                if (window.notebookIde) {
                    window.notebookIde.newProject();
                }
            }
        }, [selectedExample]
    )

    return (
        <div style={{display: "none"}}>
        </div>
    )

}

export default ProjectLoader;
