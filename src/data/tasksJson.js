import React from "react";
const tasksJson =
    {
        "move_with_key":
            {
                "name": "Move With Key",
                "content": <p>The actor moves with left / right arrow key. </p>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/move_with_key.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/move_with_key.gif",
            },

        "spawn_of_clones":
            {
                "name": "Spawn of Clones",
                "content": <p>When the green flag is clicked, display two rows of actors.</p>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/spawn_of_clones.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/spawn_of_clones.gif",
            },

        "shoot_when_space_key_pressed":
            {
                "name": "Shoot When Space Key Pressed",
                "content": <p>When the space key pressed, A bullet shoots out of the gun.</p>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/shoot_when_space_key_pressed.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/shoot_when_space_key_pressed.gif",
            },

        "move_slowly_leftwards":
            {
                "name": "Move Slowly Leftwards",
                "content": <p>When the green flag is clicked, the star slowly leftwards.</p>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/spawn_of_clones.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/spawn_of_clones.gif",
            },

        "destroy_clone_on_touch":
            {
                "name": "Destroy Clone on Touch",
                "content": <><p>Delete a clone when it touches another actor</p>
<p>Keep in mind: you need to modify the code, so that</p>
<p>1. You create a clone of the bullet by clicking on the green flag.</p>
<p>2. The clone of the bullet goes to position (0, 0), and stand there.</p>
<p>3. The star moves slowly from the right to the left. </p>
                    <p>4. When the bullet clone hits the star, it is destroyed. </p>
<p>A clone of a bullet start by going to coordinates [0, 0], and create only one clone of an actor. </p></>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/destroy_clone_on_touch.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/destroy_clone_on_touch.gif",
            },

        "rotate_actor_on_touch":

            {
                "name": "Rotate Actor on Touch",
                "content":<> <p>Update the “Destroy Clone on Touch” example, so that the star rotates when touching the bullet. </p>
<p>*Unlike in the code, the star does not need to move backwards. </p></>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/rotate_actor_on_touch.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/rotate_actor_on_touch.gif",
            },

        "destroy_clone_on_edge":
            {
                "name": "Destroy Clone on Edge",
                "content": <><p>If a sprite keeps creating clones without destroying it, it will take up a lot of resource.</p>
<p>Wrap clones of an actor around the screen. Delete a clone when it moves out of the snap stage.</p>
<p>You need to use the block “delete this clone”.</p></>,
                "png":"https://raw.githubusercontent.com/emmableu/image/master/e115/destroy_clone_on_edge.png",
                "gif":"https://raw.githubusercontent.com/emmableu/image/master/e115/destroy_clone_on_edge.gif",
            },

    }

export default  tasksJson;
