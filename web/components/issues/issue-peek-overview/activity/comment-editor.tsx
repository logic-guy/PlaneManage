import React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { Globe2, Lock } from "lucide-react";
// services
import { FileService } from "services/file.service";
// hooks
import useEditorSuggestions from "hooks/use-editor-suggestions";
// components
import { LiteTextEditorWithRef } from "@plane/lite-text-editor";
// ui
import { Button } from "@plane/ui";
// types
import type { IIssueComment } from "types";

const defaultValues: Partial<IIssueComment> = {
  access: "INTERNAL",
  comment_html: "",
};

type IIssueCommentEditor = {
  disabled?: boolean;
  onSubmit: (data: IIssueComment) => Promise<void>;
  showAccessSpecifier?: boolean;
};

type commentAccessType = {
  icon: any;
  key: string;
  label: "Private" | "Public";
};
const commentAccess: commentAccessType[] = [
  {
    icon: Lock,
    key: "INTERNAL",
    label: "Private",
  },
  {
    icon: Globe2,
    key: "EXTERNAL",
    label: "Public",
  },
];

// services
const fileService = new FileService();

export const IssueCommentEditor: React.FC<IIssueCommentEditor> = (props) => {
  const { disabled = false, onSubmit, showAccessSpecifier = false } = props;

  const editorRef = React.useRef<any>(null);

  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  const editorSuggestions = useEditorSuggestions(workspaceSlug as string | undefined, projectId as string | undefined);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IIssueComment>({ defaultValues });

  const handleAddComment = async (formData: IIssueComment) => {
    if (!formData.comment_html || isSubmitting) return;

    await onSubmit(formData).then(() => {
      reset(defaultValues);
      editorRef.current?.clearEditor();
    });
  };

  return (
    <form onSubmit={handleSubmit(handleAddComment)}>
      <div className="space-y-2">
        <div className="h-full">
          <Controller
            name="access"
            control={control}
            render={({ field: { onChange: onAccessChange, value: accessValue } }) => (
              <Controller
                name="comment_html"
                control={control}
                render={({ field: { onChange: onCommentChange, value: commentValue } }) => (
                  <LiteTextEditorWithRef
                    onEnterKeyPress={handleSubmit(handleAddComment)}
                    uploadFile={fileService.getUploadFileFunction(workspaceSlug as string)}
                    deleteFile={fileService.deleteImage}
                    ref={editorRef}
                    value={!commentValue || commentValue === "" ? "<p></p>" : commentValue}
                    customClassName="p-2 h-full"
                    debouncedUpdatesEnabled={false}
                    mentionSuggestions={editorSuggestions.mentionSuggestions}
                    mentionHighlights={editorSuggestions.mentionHighlights}
                    onChange={(comment_json: Object, comment_html: string) => onCommentChange(comment_html)}
                    commentAccessSpecifier={
                      showAccessSpecifier
                        ? { accessValue, onAccessChange, showAccessSpecifier, commentAccess }
                        : undefined
                    }
                    submitButton={
                      <Button
                        variant="primary"
                        type="submit"
                        className="!px-2.5 !py-1.5 !text-xs"
                        disabled={isSubmitting || disabled}
                      >
                        {isSubmitting ? "Adding..." : "Comment"}
                      </Button>
                    }
                  />
                )}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};
