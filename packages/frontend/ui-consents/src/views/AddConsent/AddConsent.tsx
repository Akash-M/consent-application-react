import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ConsentListState } from '$/store/consents/atoms';
import './AddConsent.scss';

const EmailRegex = /^\S+@\S+$/i;

export function AddConsent(): JSX.Element {
  const { t } = useTranslation(['Global', 'AddConsent']);

  const [formData, setFormData] = useState<Consent.NewEntry>({
    username: '',
    email: '',
    consent: {
      newsletter: false,
      ads: false,
      statistics: false,
    },
  });

  const setConsentList = useSetRecoilState(ConsentListState);

  const areConsentsValid = () => {
    return (
      !formData.consent.newsletter &&
      !formData.consent.ads &&
      !formData.consent.statistics
    );
  };

  const updateConsent = (event: React.BaseSyntheticEvent) => {
    setFormData({
      username: formData.username,
      email: formData.email,
      consent: {
        ...formData.consent,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const isDisabled = () => {
    return (
      formData.username.length === 0 ||
      !EmailRegex.test(formData.email) ||
      areConsentsValid()
    );
  };

  const postConsent = () => {
    // TODO: make api call and update store.
    // setConsentList((oldConsentList) => [formData, ...oldConsentList]);
    toast.success(t('AddConsent.success'), {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <article className="add-consent">
      <h2>{t('AddConsent.header')}</h2>

      <section className="add-consent__user-info">
        <TextField
          required
          className="text-field"
          defaultValue={formData.username}
          error={formData.username.length === 0}
          label={t('AddConsent.username')}
          name="username"
          variant="standard"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <TextField
          required
          className="text-field"
          defaultValue={formData.email}
          error={!EmailRegex.test(formData.email)}
          label={t('AddConsent.email')}
          name="email"
          variant="standard"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </section>

      <section className="add-consent__consents">
        <FormControl
          required
          component="fieldset"
          error={areConsentsValid()}
          variant="standard"
        >
          <FormLabel component="legend">{t('AddConsent.disclaimer')}</FormLabel>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.newsletter}
                  name="newsletter"
                  onChange={updateConsent}
                />
              }
              label={t<string>('Global.consents.newsletter')}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.ads}
                  name="ads"
                  onChange={updateConsent}
                />
              }
              label={t<string>('Global.consents.ads')}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.statistics}
                  name="statistics"
                  onChange={updateConsent}
                />
              }
              label={t<string>('Global.consents.statistics')}
            />
          </FormGroup>

          {areConsentsValid() && (
            <FormHelperText>{t('AddConsent.errors.consents')}</FormHelperText>
          )}
        </FormControl>
      </section>

      <Button
        disabled={isDisabled()}
        variant="contained"
        onClick={() => postConsent()}
      >
        {t('AddConsent.addButton')}
      </Button>
    </article>
  );
}
