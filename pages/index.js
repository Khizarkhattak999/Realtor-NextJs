import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Property from "../components/Property";
import styles from "../styles/Home.module.css";
import { baseURL, fetchAPI } from "../utils/fetchAPI";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttontext,
  linkname,
  imageUrl,
}) => {
  return (
    <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
      <Image src={imageUrl} width={500} height={300} alt='banner' />
      <Box p='5'>
        <Text color='gray.500' fontSize='sm' fontWeight='meduim'>
          {purpose}
        </Text>
        <Text fontSize='3xl' fontWeight='bold'>
          {title1} <br /> {title2}
        </Text>
        <Text color='gray.700' fontSize='lg' paddingTop='3' paddingBottom='3'>
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize='xl'>
          <Link href={linkname}>{buttontext}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home({propertiesforSale, propertiesforRent}) {

  // console.log(propertiesforSale)

  return (
    <Box>
      <Banner
        purpose='Rent A Home'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttontext='Explore Renting'
        linkname='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>
        {propertiesforRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>

      <Banner
        purpose='Find A Home'
        title1='Find, Buy & Own Your'
        title2='Dream Home'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttontext='Explore Buying'
        linkname='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>
        {propertiesforSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {

  const propertyforSale = await fetchAPI(`${baseURL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=9`)
  const propertyforRent = await fetchAPI(`${baseURL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9`)

  return {
      props: {
        propertiesforSale: propertyforSale?.hits, 
        propertiesforRent: propertyforRent?.hits, 
      }
  }
}
