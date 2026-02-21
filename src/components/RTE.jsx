import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-10">
      {label && (
        <label className="inline-block mb-1 pl-1 font-semibold">
          {label}
        </label>
      )}

      <div className="relative">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="le01fwwhx9rx5c1ay32ewcen0cl4y4gb9k58sjpgzjg9ryq0"
              initialValue={defaultValue}
              init={{
                height: 400,
                menubar: true,
                resize: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  ],
                toolbar:
                  "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat | help",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
