import { Box } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <>
        <Box textAlign='center' p='5' color='gray.600' borderTop='2px' borderColor='gray.400'>
            {(new Date().getFullYear())} Realtor, Inc
        </Box>  
    </>
  )
}

export default Footer