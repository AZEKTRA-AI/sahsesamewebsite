'use client'

import { CldUploadWidget } from 'next-cloudinary'

export interface UploadedAsset {
  public_id: string
  secure_url: string
}

/**
 * Isolated so the Cloudinary widget (which is client-only) cannot pull the rest
 * of the image manager out of server rendering.
 */
export default function CloudinaryUploadButton({
  folder,
  disabled,
  onUploaded,
  multiple = true,
  maxFiles = 8,
  label = '+ Upload Images',
  className,
}: {
  folder: string
  disabled?: boolean
  onUploaded: (asset: UploadedAsset) => void
  multiple?: boolean
  maxFiles?: number
  label?: string
  className?: string
}) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/signature"
      options={{
        folder,
        multiple,
        maxFiles: multiple ? maxFiles : 1,
        sources: ['local', 'url'],
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        maxFileSize: 5_000_000,
      }}
      onSuccess={(result) => {
        const info = result?.info
        if (info && typeof info !== 'string') {
          onUploaded(info as UploadedAsset)
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          disabled={disabled}
          className={
            className ??
            'w-full border-2 border-dashed border-sah-green text-sah-green rounded-lg py-3 font-medium hover:bg-sah-cream disabled:opacity-50'
          }
        >
          {disabled ? 'Working…' : label}
        </button>
      )}
    </CldUploadWidget>
  )
}
