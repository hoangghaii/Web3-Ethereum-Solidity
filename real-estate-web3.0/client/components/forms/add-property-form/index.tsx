'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { useContractWrite } from '@thirdweb-dev/react';
import axios from 'axios';
import { ethers } from 'ethers';
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/common/button';
import { AppContext } from '@/providers/app-provider';

import styles from './styles.module.css';

const schema = yup
  .object({
    price: yup.number().required(),
    propertyTitle: yup.string().required(),
    category: yup.string().required(),
    images: yup.mixed().required(),
    propertyAddress: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const AddPropertyForm: FC = () => {
  const { address, contract } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const { mutateAsync: addProperty } = useContractWrite(
    contract,
    'addProperty'
  );

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`;

    try {
      const files = data.images as any;

      const file = files[0];

      const formData = new FormData();

      formData.append('file', file);

      const metadata = JSON.stringify({
        name: file.name.split('.')[0],
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });

      formData.append('pinataOptions', options);

      const pinataRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${
              (formData as any)._boundary
            }`,
            Authorization: JWT,
          },
        }
      );

      const _images = `https://ipfs.io/ipfs/${pinataRes.data.IpfsHash}`;

      const _price = ethers.utils.parseEther(data.price.toString());

      const _owner = address;

      const _propertyTitle = data.propertyTitle;

      const _category = data.category;

      const _propertyAddress = data.propertyAddress;

      const _description = data.description;

      const txResult = await addProperty({
        args: [
          _owner,
          _price,
          _propertyTitle,
          _category,
          _images,
          _propertyAddress,
          _description,
        ],
      });

      console.info('contract call successs', txResult);

      toast.success('Create property successfully!');
    } catch (err) {
      console.error('contract call failure', err);

      toast.error('Something went wrong, please try later.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <Card className={styles.card}>
      <form onSubmit={onSubmit} className={styles.form}>
        <Heading as="h3" className={styles.title}>
          Create Property
        </Heading>

        <Flex direction="column" gap="4">
          <Flex asChild direction="column" gap="2">
            <label htmlFor="_propertyTitle">
              <Text as="span" weight="bold">
                Title
              </Text>

              <TextField.Input
                id="_propertyTitle"
                placeholder="Enter property title"
                {...register('propertyTitle')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_category">
              <Text as="span" weight="bold">
                Category
              </Text>

              <TextField.Input
                id="_category"
                placeholder="Enter property category"
                {...register('category')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_price">
              <Text as="span" weight="bold">
                Price
              </Text>

              <TextField.Input
                id="_price"
                type="string"
                placeholder="Enter property price"
                {...register('price')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_description">
              <Text as="span" weight="bold">
                Description
              </Text>

              <TextField.Input
                id="_description"
                placeholder="Enter property description"
                {...register('description')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_images">
              <Text as="span" weight="bold">
                Description
              </Text>

              <TextField.Input
                id="_images"
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register('images')}
                className={styles.form_image_input}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_propertyAddress">
              <Text as="span" weight="bold">
                Address
              </Text>

              <TextField.Input
                id="_propertyAddress"
                placeholder="Enter property address"
                {...register('propertyAddress')}
              />
            </label>
          </Flex>
        </Flex>

        <Button type="submit" className={styles.btn} isLoading={loading}>
          Create property
        </Button>
      </form>
    </Card>
  );
};

export default AddPropertyForm;
