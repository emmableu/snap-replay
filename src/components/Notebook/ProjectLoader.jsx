import React from "react";
import {useSelector} from "react-redux";

const ProjectLoader = (props) => {
    const {open} = props;
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
                if (window.notebookIde) {
                    window.notebookIde.interpretReqAnchors(selectedXml);
                }
            }
            else {
                if (window.notebookIde) {
                    window.notebookIde.newProject();
                }
            }
        }, [selectedExample, open]
    )

    return (
        <div style={{display: "none"}}>
        </div>
    )

}

export default ProjectLoader;
