import React, { FC } from 'react'
import { Modal, Box } from '@mui/material'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute: (route: string) => void;
}

const CustomModal: FC<Props> = ({
    open, setOpen, activeItem, component: Component, setRoute
}) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="bg-white p-4 w-96 m-auto mt-20">
                <Component setOpen={setOpen} setRoute={setRoute}/>
            </Box>
        </Modal>
    )
}

export default CustomModal