import { useTranslation } from "react-i18next";
import ErrorPage from "@/components/error/ErrorPage";

export default function NotFoundRoute() {
  const { t } = useTranslation();
  return (
    <ErrorPage
      code="404"
      title={t("common.notFoundTitle")}
      description={t("common.notFoundDesc")}
      variant="primary"
      secondaryLabel={t("common.backToPrevious")}
    />
  );
}
