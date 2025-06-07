// import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  Typography,
  Container,
  Box,
  Link,
  List,
  ListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Styled components
const TermsContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

// Create wrapper components to handle the component prop correctly
const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const SubsectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'list-item',
  marginBottom: theme.spacing(2),
  paddingLeft: 0,
}));

export async function getStaticProps(context: GetStaticPropsContext) {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`

  // Props returned will be passed to the page component
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['navbar', 'footer'])),
    },
  };
}

export default function TermsAndConditions() {
  return (
    <TermsContainer maxWidth="lg">
      <PageTitle variant="h3" gutterBottom>
        Terms and Conditions
      </PageTitle>
      <Paragraph variant="body1">Last updated: June 07, 2025</Paragraph>
      <Paragraph variant="body1">
        Please read these terms and conditions carefully before using Our
        Service.
      </Paragraph>
      <SectionTitle variant="h4">Interpretation and Definitions</SectionTitle>
      <SubsectionTitle variant="h5">Interpretation</SubsectionTitle>
      <Paragraph variant="body1">
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </Paragraph>
      <SubsectionTitle variant="h5">Definitions</SubsectionTitle>
      <Paragraph variant="body1">
        For the purposes of these Terms and Conditions:
      </Paragraph>
      <StyledList>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Affiliate</Box> means an entity that
            controls, is controlled by or is under common control with a party,
            where &quot;control&quot; means ownership of 50% or more of the
            shares, equity interest or other securities entitled to vote for
            election of directors or other managing authority.
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Country</Box> refers to: Greece
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Company</Box> (referred to as either
            &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or
            &quot;Our&quot; in this Agreement) refers to MINAS PHONE,
            Dimitrakopoulou 87, Athens - Koukaki, 11741, ATTICA.
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Device</Box> means any device that can
            access the Service such as a computer, a cellphone or a digital
            tablet.
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Service</Box> refers to the Website.
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Terms and Conditions</Box> (also referred as
            &quot;Terms&quot;) mean these Terms and Conditions that form the
            entire agreement between You and the Company regarding the use of
            the Service.
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Third-party Social Media Service</Box> means
            any services or content (including data, information, products or
            services) provided by a third-party that may be displayed, included
            or made available by the Service.
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">Website</Box> refers to MINAS PHONE,
            accessible from{' '}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </Link>
          </Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">
            <Box component="strong">You</Box> means the individual accessing or
            using the Service, or the company, or other legal entity on behalf
            of which such individual is accessing or using the Service, as
            applicable.
          </Paragraph>
        </StyledListItem>
      </StyledList>
      <SectionTitle variant="h4">Acknowledgment</SectionTitle>
      <Paragraph variant="body1">
        These are the Terms and Conditions governing the use of this Service and
        the agreement that operates between You and the Company. These Terms and
        Conditions set out the rights and obligations of all users regarding the
        use of the Service.
      </Paragraph>
      <Paragraph variant="body1">
        Your access to and use of the Service is conditioned on Your acceptance
        of and compliance with these Terms and Conditions. These Terms and
        Conditions apply to all visitors, users and others who access or use the
        Service.
      </Paragraph>
      <Paragraph variant="body1">
        By accessing or using the Service You agree to be bound by these Terms
        and Conditions. If You disagree with any part of these Terms and
        Conditions then You may not access the Service.
      </Paragraph>
      <Paragraph variant="body1">
        You represent that you are over the age of 18. The Company does not
        permit those under 18 to use the Service.
      </Paragraph>
      <Paragraph variant="body1">
        Your access to and use of the Service is also conditioned on Your
        acceptance of and compliance with the Privacy Policy of the Company. Our
        Privacy Policy describes Our policies and procedures on the collection,
        We don&apos;t share Your personal information with third parties.
        However, we may use third-party service providers to help us operate our
        business and the Site or administer activities on our behalf, such as
        sending out newsletters or surveys. We may share your information with
        these third parties for those limited purposes provided that you have
        given us your permission.
      </Paragraph>
      <SectionTitle variant="h4">Links to Other Websites</SectionTitle>
      <Paragraph variant="body1">
        Our Service may contain links to third-party web sites or services that
        are not owned or controlled by the Company.
      </Paragraph>
      <Paragraph variant="body1">
        The Company has no control over, and assumes no responsibility for, the
        content, privacy policies, or practices of any third party web sites or
        services. You further acknowledge and agree that the Company shall not
        be responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with the use of or
        reliance on any such content, goods or services available on or through
        any such web sites or services.
      </Paragraph>
      <Paragraph variant="body1">
        We strongly advise You to read the terms and conditions and privacy
        policies of any third-party web sites or services that You visit.
      </Paragraph>
      <SectionTitle variant="h4">Termination</SectionTitle>
      <Paragraph variant="body1">
        We may terminate or suspend Your access immediately, without prior
        notice or liability, for any reason whatsoever, including without
        limitation if You breach these Terms and Conditions.
      </Paragraph>
      <Paragraph variant="body1">
        Upon termination, Your right to use the Service will cease immediately.
      </Paragraph>
      <SectionTitle variant="h4">Limitation of Liability</SectionTitle>
      <Paragraph variant="body1">
        Notwithstanding any damages that You might incur, the entire liability
        of the Company and any of its suppliers under any provision of this
        Terms and Your exclusive remedy for all of the foregoing shall be
        limited to the amount actually paid by You through the Service or 100
        USD if You haven&apos;t purchased anything through the Service.
      </Paragraph>
      <Paragraph variant="body1">
        To the maximum extent permitted by applicable law, in no event shall the
        Company or its suppliers be liable for any special, incidental,
        indirect, or consequential damages whatsoever (including, but not
        limited to, damages for loss of profits, loss of data or other
        information, for business interruption, for personal injury, loss of
        privacy arising out of or in any way related to the use of or inability
        to use the Service, third-party software and/or third-party hardware
        used with the Service, or otherwise in connection with any provision of
        this Terms), even if the Company or any supplier has been advised of the
        possibility of such damages and even if the remedy fails of its
        essential purpose.
      </Paragraph>
      <Paragraph variant="body1">
        Some states do not allow the exclusion of implied warranties or
        limitation of liability for incidental or consequential damages, which
        means that some of the above limitations may not apply. In these states,
        each party&apos;s liability will be limited to the greatest extent
        permitted by law.
      </Paragraph>
      <SectionTitle variant="h4">
        &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
      </SectionTitle>
      <Paragraph variant="body1">
        The Service is provided to You &quot;AS IS&quot; and &quot;AS
        AVAILABLE&quot; and with all faults and defects without warranty of any
        kind. To the maximum extent permitted under applicable law, the Company,
        on its own behalf and on behalf of its Affiliates and its and their
        respective licensors and service providers, expressly disclaims all
        warranties, whether express, implied, statutory or otherwise, with
        respect to the Service, including all implied warranties of
        merchantability, fitness for a particular purpose, title and
        non-infringement, and warranties that may arise out of course of
        dealing, course of performance, usage or trade practice. Without
        limitation to the foregoing, the Company provides no warranty or
        undertaking, and makes no representation of any kind that the Service
        will meet Your requirements, achieve any intended results, be compatible
        or work with any other software, applications, systems or services,
        operate without interruption, meet any performance or reliability
        standards or be error free or that any errors or defects can or will be
        corrected.
      </Paragraph>
      <Paragraph variant="body1">
        Without limiting the foregoing, neither the Company nor any of the
        company&apos;s provider makes any representation or warranty of any
        kind, express or implied: (i) as to the operation or availability of the
        Service, or the information, content, and materials or products included
        thereon; (ii) that the Service will be uninterrupted or error-free;
        (iii) as to the accuracy, reliability, or currency of any information or
        content provided through the Service; or (iv) that the Service, its
        servers, the content, or e-mails sent from or on behalf of the Company
        are free of viruses, scripts, trojan horses, worms, malware, timebombs
        or other harmful components.
      </Paragraph>
      <Paragraph variant="body1">
        Some jurisdictions do not allow the exclusion of certain types of
        warranties or limitations on applicable statutory rights of a consumer,
        so some or all of the above exclusions and limitations may not apply to
        You. But in such a case the exclusions and limitations set forth in this
        section shall be applied to the greatest extent enforceable under
        applicable law.
      </Paragraph>
      <SectionTitle variant="h4">Governing Law</SectionTitle>
      <Paragraph variant="body1">
        The laws of the Country, excluding its conflicts of law rules, shall
        govern this Terms and Your use of the Service. Your use of the
        Application may also be subject to other local, state, national, or
        international laws.
      </Paragraph>
      <SectionTitle variant="h4">Disputes Resolution</SectionTitle>
      <Paragraph variant="body1">
        If You have any concern or dispute about the Service, You agree to first
        try to resolve the dispute informally by contacting the Company.
      </Paragraph>
      <SectionTitle variant="h4">For European Union (EU) Users</SectionTitle>
      <Paragraph variant="body1">
        If You are a European Union consumer, you will benefit from any
        mandatory provisions of the law of the country in which You are
        resident.
      </Paragraph>
      <SectionTitle variant="h4">United States Legal Compliance</SectionTitle>
      <Paragraph variant="body1">
        You represent and warrant that (i) You are not located in a country that
        is subject to the United States government embargo, or that has been
        designated by the United States government as a &quot;terrorist
        supporting&quot; country, and (ii) You are not listed on any United
        States government list of prohibited or restricted parties.
      </Paragraph>
      <SectionTitle variant="h4">Severability and Waiver</SectionTitle>
      <SubsectionTitle variant="h5">Severability</SubsectionTitle>
      <Paragraph variant="body1">
        If any provision of these Terms is held to be unenforceable or invalid,
        such provision will be changed and interpreted to accomplish the
        objectives of such provision to the greatest extent possible under
        applicable law and the remaining provisions will continue in full force
        and effect.
      </Paragraph>
      <SubsectionTitle variant="h5">Waiver</SubsectionTitle>
      <Paragraph variant="body1">
        Except as provided herein, the failure to exercise a right or to require
        performance of an obligation under these Terms shall not affect a
        party&apos;s ability to exercise such right or require such performance
        at any time thereafter nor shall the waiver of a breach constitute a
        waiver of any subsequent breach.
      </Paragraph>
      <SectionTitle variant="h4">Translation Interpretation</SectionTitle>
      <Paragraph variant="body1">
        These Terms and Conditions may have been translated if We have made them
        available to You on our Service. You agree that the original English
        text shall prevail in the case of a dispute.
      </Paragraph>
      <SectionTitle variant="h4">
        Changes to These Terms and Conditions
      </SectionTitle>
      <Paragraph variant="body1">
        We reserve the right, at Our sole discretion, to modify or replace these
        Terms at any time. If a revision is material We will make reasonable
        efforts to provide at least 30 days&apos; notice prior to any new terms
        taking effect. What constitutes a material change will be determined at
        Our sole discretion.
      </Paragraph>
      <Paragraph variant="body1">
        By continuing to access or use Our Service after those revisions become
        effective, You agree to be bound by the revised terms. If You do not
        agree to the new terms, in whole or in part, please stop using the
        website and the Service.
      </Paragraph>
      <SectionTitle variant="h4">Contact Us</SectionTitle>
      <Paragraph variant="body1">
        If you have any questions about these Terms and Conditions, You can
        contact us:
      </Paragraph>
      <StyledList>
        <StyledListItem>
          <Paragraph variant="body1">By email: support@minasphone.gr</Paragraph>
        </StyledListItem>
        <StyledListItem>
          <Paragraph variant="body1">By phone number: 2109224764</Paragraph>
        </StyledListItem>
      </StyledList>
    </TermsContainer>
  );
}
