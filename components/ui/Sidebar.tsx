import { useContext } from "react";
import { Box, Divider, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

import { UIContext } from "@/context/ui";

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts']

export const Sidebar = () => {

    const { sideMenuOpen, closeSideMenu } = useContext(UIContext)

    return (
        <Drawer
            anchor="left"
            open={ sideMenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menú</Typography>
                </Box>
                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItem button key={ text }>
                                <ListItemIcon>
                                    { index % 2? <InboxOutlinedIcon/>: <MailOutlineOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ) )
                    }
                </List>

                <Divider />
                
                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItem button key={ text }>
                                <ListItemIcon>
                                    { index % 2? <InboxOutlinedIcon/>: <MailOutlineOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ) )
                    }
                </List>

            </Box>

        </Drawer>
    )
};