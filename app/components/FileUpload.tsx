"use client";

import React, {useState } from "react";
import {IKUpload } from "imagekitio-next";
import {Loader2} from "Lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";


interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress?: (progress : number) => void;
    fileType? : "image" | "video";
}



export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image"
}: FileUploadProps) {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);





    const onError = (err : {message : string}) => {
        console.log("Error", err);
        setError(err.message);
        setUploading(false)
      };
      
      const handleSuccess = (response : IKUploadResponse) => {
        console.log("Success", response);
        setUploading(false);
        setError(null);
        onSuccess(response);
       
      };
      
      const handleProgress= (evt : ProgressEvent) => {
        if(evt.lengthComputable && onProgress){
            const precentage = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(precentage));
        }
      };
      
      const handleStartUpload = () => {
        setUploading(true);
        setError(null);
      };

      const validateFile = (file : File) => {
        if (!file) return false;
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload a video file");
                return false;
            }
            if(file.size > 100*1024*1024){
                setError("Video size should be less than 100MB");
                return false;
            }
        }
        else {
            const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp","image/jpg","image/heic","image/heif","image/avif","image/apng","image/bmp","image/flif","image/x-icon","image/tiff","image/jp2","image/jpx","image/jpm","image/jxr","image/psd","image/ai","image/eps","image/indd","image/pdf","image/x-raw","image/x-xcf","image/x-sketch","image/x-fig","image/x-svg","image/x-dwg","image/x-dxf","image/x-3ds","image/x-fbx","image/x-stl","image/x-obj","image/x-ply","image/x-3mf","image/x-gltf","image/x-glb","image/x-usdz","image/x-dae","image/x-abc","image/x-3dm","image/x-3dmf","image/x-3dml","image/x-3ds","image/x-3mf","image/x-ac","image/x-ac3d","image/x-acd","image/x-acis","image/x-act","image/x-adobe-dng","image/x-amf","image/x-ase","image/x-ase2","image/x-asc","image/x-ase","image/x-ase2","image/x-asc","image/x-avif","image/x-awg","image/x-b3d","image/x-bip","image/x-bmp","image/x-btf","image/x-c4d","image/x-cals","image/x-cgm","image/x-cmx","image/x-collada","image/x-cpt","image/x-crv","image/x-csc","image/x-csf","image/x-cst","image/x-cuix","image/x-dae","image/x-dbf","image/x-dcs","image/x-dcx","image/x-dds","image/x-dgn","image/x-dib","image/x-djvu","image/x-dl","image/x-dng","image/x-dos","image/x-dpx","image/x-dwg","image/x-dxf","image/x-e00","image/x-ecw","image/x-ep","image/x-eps","image/x-erf","image/x-exr","image/x-f4v","image/x-fh","image/x-fits","image/x-flif","image/x-fpx","image/x-freearc","image/x-fujifilm-raf","image/x-g3","image/x-gif","image/x-glm","image/x-gltf","image/x-gn","image/x-gre","image/x-grib","image/x-gz","image/x-hdr","image/x-hdr","image/x-hk","image/x-hr","image/x-icb","image/x-icns","image/x-ico","image/x-iff","image/x-ig","image/x-iges","image/x-igs","image/x-ilbm","image/x-im","image/x-ima","image/x-image","image/x-img","image/x-in","image/x-indd","image/x-indesign","image/x-ink","image/x-iptc","image/x-iso","image/x-iso9660-image","image/x-iv","image/x-j2c","image/x-j2k","image/x-jng","image/x-jp2","image/x-jpc","image/x-jpeg","image/x-jpf","image/x-jpg","image/x-jpm","image/x-jps","image/x-jpt","image/x-jxr","image/x-kdc","image/x-kodak-dcr","image/x-kodak-k25","image/x-kodak-kdc","image/x-lbm","image/x-lbr","image/x-lwo","image/x-lws","image/x-macpaint","image/x-mag","image/x-matroska","image/x-mb","image/x-mdb","image/x-mef","image/x-mie","image/x-mif","image/x-mix","image/x-mng","image/x-mrw"];
            if(!validTypes.includes(file.type)){
                setError("Please upload a valid image file");
                return false;
            }
            if(file.size > 5*1024*1024){
                setError("Image size should be less than 5MB");
                return false;
            }
        }
        return true;
        
      }
  
  return (
    <div className="space-y-2">
        <IKUpload
          fileName={fileType === "video" ? "sample-video" : "sample-image" }
          useUniqueFileName={true}
          validateFile={validateFile}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          folder={fileType === "video" ? "/videos" : "/images"}
          className="file-input file-input-bordered w-full"
          />

          {
            uploading && (
                <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="animate-spin w-4 h-4" size={20}/>
                    <span>Uploading...</span>
                </div>
            )
          }
          {
                error && (
                    <div className="text-error text-sm ">{error}</div>
                )
          }
    </div>
  );
}