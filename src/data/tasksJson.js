import React from "react";
const tasksJson =
    {
        "move_with_key":
            {
                "name": "Move With Key",
                "content": <p>The actor moves with left / right arrow key. </p>,
                "png": "https://lh6.googleusercontent.com/fX1NoNCuAB_xxxW0YPK66d2dJ1BTJqdJ1ceyPuZqQDp0wKbXQS-cDiEV6GZL8ySeyIJFzx3ky4-N-WlVGTThyXdFmJaBu007mKx6Reo6tIXsOv6rNSQmA-6099pZ3L52OUKxttWW",
                "gif": "https://lh4.googleusercontent.com/ux7AZn_hXCcsoUxrEg2EZQS6hcer6fe5xx5apCluMOXP1X0TitDJnZa8aGOxrkopjG0Uvawij7l0RMlFbwCRa35aiFT2HogfnCYE-P2eyrvYiwK3LDLuOhTK5peSNOHrQfESKCIx"
            },

        "spawn_of_clones":
            {
                "name": "Spawn of Clones",
                "content": <p>When the green flag is clicked, display two rows of actors</p>,
                "png": "https://lh4.googleusercontent.com/lvM4-cQmlxFU0rkdDOdfc07NUos0n585SXx8OYFvCIx5yOkML5Vu9dltS7ZoSYWemfiKb7rIUfbmVr4NoLQwVMV1w4cE0wEvdsx-NQ424JB5mDvJeDuIW9EEMEA6Kmn95VZmX1Hw",
                "gif": "https://lh6.googleusercontent.com/UvjwGfvslb4Nb7-49vpBs4LHyn3u1ZJWnXli7fVjcU_ML4ejAg7Cus4Eln0-e62yHT0bKtbI6idT05CQHD4WFZbBNIROuWKFPLSI4KadhgmspNmfTI9zFqEM52k9a7NOzo3mrgcG"
            },

        "shoot_when_space_key_pressed":
            {
                "name": "Shoot When Space Key Pressed",
                "content": <p>when key space pressed, A bullet shoots out of the gun</p>,
                "png": "https://lh5.googleusercontent.com/k5HC-5Apu1HnRo0w9xHj7sjkCKf_nSG52jCG59D5dMeTShKEJvfrCM3UCFvAPzmrFNu4STV6GSVusr0oUdYivZxpQEaw8kvoXdrwdzHBeKhJ9S17qcdL0e8WQlYpvID3kHRZITJt",
                "gif": "https://lh6.googleusercontent.com/HM0alcz0PCTLnG7toMD7W1JpuzwHO1L19SHxouHbrvCIdMfoPt8KJ41ESKT0rGo3EkdNHZdGZXvHh4IEXFTzjgDqnoWlogxgwhDQx3o3B9t-RJxX87Xc3DIbhmgiNkgxj5m-MXh2"
            },

        "move_slowly_leftwards":
            {
                "name": "Move Slowly Leftwards",
                "content": <p>When the green flag is clicked, the star slowly leftwards.</p>,
                "png": "https://lh6.googleusercontent.com/25_LUnEIGHvwDGiK6Dtz5KPXyGAKfY8JiKQs_4N73kgAQrPO-BKockBkg1hCymvcJIkCIcACz9LhEaJmt1-6vcu8FpIPQAAIWpq8FJpg2VuNIbHe07-Lsv7mnat_abbG4LW2VgDB",
                "gif": "https://lh5.googleusercontent.com/bBt02Ztg1_90cUEVKlT-pSrXXZFWD79-e57HgTiFtmyW91hHi8mbv7SYSH2A-Cdoq1A5-Sbrdr0T42opOY76qxrANHtVt2UD7rYTRJdRRbdLy8YujeTAkyckLngu0rXQg-kigUNl"
            },

        "destroy_clone_on_touch":
            {
                "name": "Destroy Clone on Touch",
                "content": <><p>Delete a clone when it touches another actor</p>
<p>Keep in mind: you need to modify the code, so that</p>
<ol>
<li><p>You create a clone of the bullet by clicking on the green flag.</p>
</li>
<li><p>the clone of the bullet goes to position (0, 0), and stand there.</p>
</li>
<li><p>The star moves slowly from the right to the left. </p>
</li>
<li><p>When the bullet clone hits the star, it is destroyed. </p>
</li>
</ol>
<p>A clone of a bullet start by going to coordinates [0, 0], and create only one clone of an actor. </p>
<p>Try play it on your own [ add link ]</p></>,
                "png": "https://lh6.googleusercontent.com/wntUTLpKQIlIEkxW099dpRfoKbpK10VPIHNWW-KN5_aJdFnyE4lbgymS-aEtV8s9mfNSjZn2rrHcgYLNi6PB5psILqh2qTrNaoBmuvELiOWoxOT2s27Nw2mkCjFOoRv6U4JDRfcq",
                "gif": "https://lh5.googleusercontent.com/aFGOWmu647kHsFiErFDfjJrcY_p7txOZak43Y2lAbuamm2zpDT3sdI0ykyGNj8lc8yKcQjI9vAM7bvBqnRhbK_3B4ai3oLdsGolsBwn06esvAb8r8RJIiMyNTh2LNDWNlc5ZNhZT"
            },

        "rotate_actor_on_touch":

            {
                "name": "Rotate Actor on Touch",
                "content":<> <p>Update the “Destroy Clone on Touch” example, so that the star rotates when touching the bullet. </p>
<p>*Unlike in the code, the star does not need to move backwards. </p></>,
                "png": "https://lh3.googleusercontent.com/5JQBbW2kn_eDRKsTbV9MriIF900crL1vgEX1gSUR3IaNzPILLWv-2rnpM7t0x-c3Ex1J8ym3s6rX-MkD-NIrJFCVuMnvKw5k8vifdjLjmPVGfUxaZeHJW26hcpWE-RhSSTF6Myf-",
                "gif": "https://lh4.googleusercontent.com/TU9DKJgOpzH0PaXIXRM9rXy7SLKvsEyhRQdzZvr0lh8w-ys6uDswe6k1IZH6Rm4WUW_eQ2eqBGZz1qHsXnTbTXViX6nURnW1fLwrGTgOJIT7CjJw4LRH86WE_h3FvS5VXhfMovUs"
            },
        "destroy_clone_on_edge":
            {
                "name": "Destroy Clone on Edge",
                "content": <><p>If a sprite keeps creating clones without destroying it, it will take up a lot of resource.</p>
<p>Wrap clones of an actor around the screen. Delete a clone when it moves out of the snap stage.</p>
<p>You need to use the block “delete this clone”.</p></>,
                "png": "https://lh6.googleusercontent.com/Bm7my6UbdPswPPH4FppMI9nHdoRRWNhmDBfuovBJsZEt6eeuQKiXHy788mHrjprxhmV6uttXrE9fqw67VRzpYdiNmZ5QtlxB7lLoRndBPk3-_y2mOMjsMMOZEgI1mC9RBvVfIK-m",
                "gif": "https://lh4.googleusercontent.com/TyHeXQ4f7PsOqGim-WMN24tPAIeJHdm5WBuirroIYZZOs51vrGl8q1ZdvL2GpZ7PEl7mIMbSIDZD95sRJG0OhaB1E7URL4xWy6qSc28xo4Xnf8PnlsGRKDi1V1r_wVj8y-3dHfHT"
            },

    }

export default  tasksJson;
