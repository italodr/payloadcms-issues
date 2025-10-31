'use client'
import type { GenericTranslationsObject, NestedKeysStripped } from '@payloadcms/translations'
import type { TextFieldClientProps } from 'payload'

import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields,
  useTranslation,
} from '@payloadcms/ui'
import React, { useCallback, useEffect } from 'react'

import { format } from './formatSlug'

type SlugComponentProps = {
  checkboxFieldPath: string
  fieldToUse: string
} & TextFieldClientProps

type BlendAppTranslations = GenericTranslationsObject
type BlendAppTranslationKeys = NestedKeysStripped<BlendAppTranslations>

export const SlugComponent: React.FC<SlugComponentProps> = ({
  checkboxFieldPath: checkboxFieldPathFromProps,
  field,
  fieldToUse,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { i18n } = useTranslation<BlendAppTranslations, BlendAppTranslationKeys>()
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { setValue, value } = useField<string>({ path: path || field.name })

  const { dispatchFields } = useForm()

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = format(targetFieldValue)

        if (value !== formattedSlug) {
          setValue(formattedSlug)
        }
      } else if (value !== '') {
        setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value, i18n.language])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type blend-app-slug-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button buttonStyle="none" className="lock-button" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
        value={value}
      />
    </div>
  )
}
