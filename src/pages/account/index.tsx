import Button from "@/components/@shared/UI/Button";
import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import ProfileImagePreview from "@/components/@shared/UI/ProfileImagePreview";
import DeleteUserModal from "@/components/PageComponents/auth/DeleteUserModal";
import { useAuth } from "@/core/context/AuthProvider";
import { UpdateUserForm } from "@/core/dtos/user/auth";
import useModalStore from "@/lib/hooks/stores/modalStore";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Account() {
  const { user, updateMe, isPending: isAuthPending } = useAuth(true);
  const {
    file,
    fileInputValue,
    getImageUrl,
    handleFileInputChange,
    imagePreview,
    clearFileInput,
    setImagePreview,
  } = useImageUpload(user?.image);

  const [name, setName] = useState(user?.nickname ?? "");
  const deleteUserModalName = "deleteUserModal";
  const isDeleteUserModalOpen = useModalStore(
    (state) => state.modals[deleteUserModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const { mutate: submitChange } = useMutation({
    mutationFn: async () => {
      const updateUserForm: UpdateUserForm = {};
      let imageUrl: string;
      if (file) {
        imageUrl = await getImageUrl(file);
        updateUserForm.image = imageUrl;
      }
      if (name !== user?.nickname) updateUserForm.nickname = name;
      if (!!updateUserForm.image || !!updateUserForm.image) {
        await updateMe(updateUserForm);
      }
    },
    throwOnError: false,
    onError: (e) => {
      console.error(e);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitChange();
  };

  useEffect(() => {
    if (!isAuthPending) {
      setName(user?.nickname ?? "");
      setImagePreview(user?.image ?? null);
    }
  }, [isAuthPending]);

  return (
    <>
      <Head>
        <title>계정 설정</title>
      </Head>
      <main className="[&&]:max-md:mt-21 mt-25 mx-auto flex max-w-[49.5rem] flex-col gap-6 px-6 [&&]:max-sm:px-4">
        <h1 className="text-text-xl font-bold text-text-primary">계정 설정</h1>
        <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
          <ProfileImagePreview
            value={fileInputValue}
            onInputChange={handleFileInputChange}
            preview={imagePreview}
            clearFile={clearFileInput}
          >
            <div className="relative h-16 w-16">
              <Image
                fill
                src="/icons/icon-default_profile.svg"
                alt="프로필 이미지"
              />
            </div>
          </ProfileImagePreview>
          <InputLabel label="이름">
            <InputAlt value={name} onChange={handleNameChange} />
          </InputLabel>
          <InputLabel label="이메일">
            <InputAlt
              className="cursor-default text-text-disabled [&&]:bg-background-tertiary [&&]:hover:border-border-primary [&&]:focus:border-border-primary"
              value={user?.email}
              readOnly
            />
          </InputLabel>
          <InputLabel label="비밀번호">
            <div className="relative w-full">
              <InputAlt
                className="cursor-default text-text-disabled [&&]:bg-background-tertiary [&&]:hover:border-border-primary [&&]:focus:border-border-primary"
                type="password"
                value="password"
                readOnly
              />
              <Link href="/reset-password">
                <Button
                  className="w-18.5 absolute right-4 top-2 h-8 text-sm font-semibold text-white [&&]:max-sm:top-1.5"
                  variant="solid"
                  size="large"
                >
                  변경하기
                </Button>
              </Link>
            </div>
          </InputLabel>
          <div className="flex items-start justify-between">
            <span
              className="flex h-fit cursor-pointer items-center gap-2"
              onClick={() => {
                openModal(deleteUserModalName);
              }}
            >
              <div className="relative h-6 w-6">
                <Image fill src="/icons/icon-secession.svg" alt="탈퇴" />
              </div>
              <span className="text-text-lg font-medium text-status-danger">
                회원 탈퇴하기
              </span>
            </span>
            <Button
              className="w-18.5 h-8 text-sm font-semibold text-white"
              variant="solid"
              size="large"
              type="submit"
            >
              저장하기
            </Button>
          </div>
        </form>
      </main>
      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        onClose={() => closeModal(deleteUserModalName)}
      />
    </>
  );
}
