import React, { Fragment, useState } from "react";
import { ParcelPreview, StepActions } from "components";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { included } from "./rates";
import DeliveryItem from "../DeliveryItem/DeliveryItem";
import {
  AccordionDetailsWrapper,
  AccordionSummary,
} from "./DeliveryOptionsStyles";
import { StepActionsProps } from "interfaces/StepPropsTypes";
import { StepContainerWrapper } from "components/StepForm/StepFormStyles";

const shipmentJson = {
  address_from: {
    province: "Ciudad de México",
    city: "Azcapotzalco",
    name: "Jose Fernando",
    zip: "02900",
    country: "MX",
    address1: "Av. Principal #234",
    company: "skydropx",
    address2: "Centro",
    phone: "5555555555",
    email: "skydropx@email.com",
  },
  parcels: [
    {
      weight: 3,
      distance_unit: "CM",
      mass_unit: "KG",
      height: 10,
      width: 10,
      length: 10,
    },
  ],
  address_to: {
    province: "Jalisco",
    city: "Guadalajara",
    name: "Jorge Fernández",
    zip: "44100",
    country: "MX",
    address1: " Av. Lázaro Cárdenas #234",
    company: "-",
    address2: "Americana",
    phone: "5555555555",
    email: "ejemplo@skydropx.com",
    reference: "Frente a tienda de abarro",
    contents: "Hola",
  },
};

const DeliveryOptions = ({ currentStep, next, previus }: StepActionsProps) => {
  const { address_from, address_to, parcels } = shipmentJson;
  const parcel = parcels[0];

  //solo las opciones de envio
  const deliveryOptions = included?.filter(({ type }) => type === "rates");

  const [deliverySelected, setdeliverySelected] = useState("");

  return (
    <Fragment>
      <StepContainerWrapper>
        <Accordion defaultExpanded elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="overline">Detalle del paquete</Typography>
          </AccordionSummary>
          <AccordionDetailsWrapper>
            <Grid container spacing={2}>
              <ParcelPreview
                address_from={address_from}
                address_to={address_to}
                parcel={parcel}
              />
            </Grid>
          </AccordionDetailsWrapper>
        </Accordion>
        <Typography variant="overline">Paqueteria</Typography>
        <Grid container spacing={2}>
          {deliveryOptions?.map(({ id, attributes }) => (
            <Grid item xs={6} md={4} key={id}>
              <DeliveryItem
                key={`opcion${id}`}
                provider={attributes?.provider as string}
                service_level={attributes.service_level_name as string}
                days={attributes.days as number}
                pricing={attributes.total_pricing as string}
                currency={attributes.currency_local as string}
                selected={deliverySelected === id}
                onClick={() => {
                  setdeliverySelected(id);
                }}
                typechip="default"
              />
            </Grid>
          ))}
        </Grid>
      </StepContainerWrapper>
      <StepActions currentStep={currentStep} next={next} previus={previus} />
    </Fragment>
  );
};

export default DeliveryOptions;
