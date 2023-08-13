"use client"
import React from 'react'
import {Image,Stack,Heading,Text,Divider,Button, Card, CardHeader, CardBody, CardFooter,ButtonGroup } from '@chakra-ui/react'

const ImgCard = ({element}) => {


  return (
    <>
        <Card maxW='xs' height={220} width={218} className='chakraCard'>
  <CardBody pt={0} px={0} border="0px" >
    <Image mt={3} height={32} width="100%" px={4}
      src={element.imageUrl}
      alt='Green double couch with wooden legs'
    />
    <Stack mt='4' spacing='3'>
      <Heading size='md' px={4}>{element.name}</Heading>
      <Text color='gray' px={4}  mt='-3.5' >
        {element.date}
      </Text>

    </Stack>
  </CardBody>
</Card>
    </>
  )
}

export default ImgCard