import React from "react";
import styles from "./list.module.css";
import {List, Image, Label, Icon, Header} from 'semantic-ui-react'


const ProfileList = ({list}) => {
    return (
        <List divided inverted relaxed>

            {list.map(item => <List.Item className={styles.item}>
                <Image size={"tiny"} className={styles.itemImage} rounded
                       src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                <List.Content className={styles.itemBody}>
                    <List.Header className={styles.header}> <Header> Semantic-Org/Semantic-UI </Header> <Icon inverted
                                                                                                              name={"close"}/></List.Header>
                    <List.Description>Updated 10 mins ago</List.Description>
                </List.Content>
            </List.Item>)}

        </List>
    );
};

export default ProfileList;
