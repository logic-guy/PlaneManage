# Module imports
from . import BaseViewSet
from plane.api.serializers import ShortCutSerializer
from plane.api.permissions import ProjectEntityPermission
from plane.db.models import Shortcut


class ShortCutViewSet(BaseViewSet):

    serializer_class = ShortCutSerializer
    model = Shortcut
    permission_classes = [
        ProjectEntityPermission,
    ]

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs.get("project_id"))

    def get_queryset(self):
        return self.filter_queryset(
            super()
            .get_queryset()
            .filter(workspace__slug=self.kwargs.get("slug"))
            .filter(project_id=self.kwargs.get("project_id"))
            .filter(project__project_projectmember__member=self.request.user)
            .select_related("project")
            .select_related("workspace")
            .distinct()
        )
