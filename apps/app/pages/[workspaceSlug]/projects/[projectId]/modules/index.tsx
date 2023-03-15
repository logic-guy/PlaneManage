import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import useSWR from "swr";
import { PlusIcon } from "@heroicons/react/24/outline";
// image
import emptyModule from "public/empty-state/empty-module.svg";


// layouts
import AppLayout from "layouts/app-layout";
// lib
import { requiredAuth } from "lib/auth";
// services
import projectService from "services/project.service";
import modulesService from "services/modules.service";
// components
import { CreateUpdateModuleModal, SingleModuleCard } from "components/modules";
// ui
import { EmptyState, HeaderButton, Loader } from "components/ui";
import { BreadcrumbItem, Breadcrumbs } from "components/breadcrumbs";
// icons
// types
import { IModule, SelectModuleType } from "types/modules";
// fetch-keys
import type { NextPage, GetServerSidePropsContext } from "next";
import { MODULE_LIST, PROJECT_DETAILS } from "constants/fetch-keys";

const ProjectModules: NextPage = () => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;
  const [selectedModule, setSelectedModule] = useState<SelectModuleType>();
  const [createUpdateModule, setCreateUpdateModule] = useState(false);

  const { data: activeProject } = useSWR(
    workspaceSlug && projectId ? PROJECT_DETAILS(projectId as string) : null,
    workspaceSlug && projectId
      ? () => projectService.getProject(workspaceSlug as string, projectId as string)
      : null
  );

  const { data: modules } = useSWR<IModule[]>(
    workspaceSlug && projectId ? MODULE_LIST(projectId as string) : null,
    workspaceSlug && projectId
      ? () => modulesService.getModules(workspaceSlug as string, projectId as string)
      : null
  );

  const handleEditModule = (module: IModule) => {
    setSelectedModule({ ...module, actionType: "edit" });
    setCreateUpdateModule(true);
  };

  useEffect(() => {
    if (createUpdateModule) return;
    const timer = setTimeout(() => {
      setSelectedModule(undefined);
      clearTimeout(timer);
    }, 500);
  }, [createUpdateModule]);

  return (
    <AppLayout
      meta={{
        title: "Plane - Modules",
      }}
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbItem title="Projects" link={`/${workspaceSlug}/projects`} />
          <BreadcrumbItem title={`${activeProject?.name ?? "Project"} Modules`} />
        </Breadcrumbs>
      }
      right={
        <HeaderButton
          Icon={PlusIcon}
          label="Add Module"
          onClick={() => {
            const e = new KeyboardEvent("keydown", {
              key: "m",
            });
            document.dispatchEvent(e);
          }}
        />
      }
    >
      <CreateUpdateModuleModal
        isOpen={createUpdateModule}
        setIsOpen={setCreateUpdateModule}
        data={selectedModule}
      />
      {modules ? (
        modules.length > 0 ? (
          <div className="space-y-5">
            <div className="flex flex-col gap-5">
              <h3 className="text-3xl font-semibold text-black">Modules</h3>

              <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module) => (
                  <SingleModuleCard
                    key={module.id}
                    module={module}
                    handleEditModule={() => handleEditModule(module)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            type="module"
            title="Create New Module"
            description="Modules are smaller, focused projects that help you group and organize issues within a specific time frame."
            imgURL={emptyModule}
          />
        )
      ) : (
        <Loader className="grid grid-cols-3 gap-4">
          <Loader.Item height="100px" />
          <Loader.Item height="100px" />
          <Loader.Item height="100px" />
          <Loader.Item height="100px" />
          <Loader.Item height="100px" />
          <Loader.Item height="100px" />
        </Loader>
      )}
    </AppLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const user = await requiredAuth(ctx.req?.headers.cookie);

  const redirectAfterSignIn = ctx.resolvedUrl;

  if (!user) {
    return {
      redirect: {
        destination: `/signin?next=${redirectAfterSignIn}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default ProjectModules;
